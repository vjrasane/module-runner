import { code, Code, imp, joinCode } from "ts-poet";
import { packageName } from "src/core/config.ts";

const CORE = packageName;

const defineRemoteModule = imp(`defineRemoteModule@${CORE}`);
const AnsibleModuleMeta = imp(`t:AnsibleModuleMeta@${CORE}`);
const RemoteModuleSpec = imp(`t:RemoteModuleSpec@${CORE}`);

/** python → TS contract: one record per module, JSON on the introspect module's stdout. */
export interface ModuleGen {
  fqcn: string;
  style: "new" | "old";
  meta: {
    fqcn: string;
    actionPlugin: boolean;
    powershell: boolean;
    rawParams: boolean;
    checkMode: "full" | "partial" | "none" | "N/A";
  };
  options: Record<string, AnsibleOption>;
  returndocs: Record<string, AnsibleOption>;
}

/** The owning collection + pinned version, stamped onto every module of a run. */
export interface CollectionPin {
  name: string;
  version: string;
}

/** Full introspect output: the owning collection, the version it resolved to, and
 * the per-module records. `version` is what the server installed — the pin stamped
 * onto the emitted bindings (the concrete latest when none was requested); `null` for
 * the core collections (ansible.builtin/legacy), which ship in ansible-core unpinned. */
export interface CodegenResult {
  collection: string;
  version: string | null;
  modules: ModuleGen[];
}

interface AnsibleOption {
  type?: string;
  elements?: string | { type?: string };
  choices?: unknown[];
  required?: boolean;
  description?: string | string[];
  suboptions?: Record<string, AnsibleOption>;
}

// --- codegen config -------------------------------------------------------

// Action plugins with no shippable module of their own (shell = command + _uses_shell,
// fetch = controller-side download). The server runs them by fqcn, so we emit a plain
// remote module with an empty-sources spec. Everything else with its own module (copy,
// service, package, command, …) flows through the normal style-"new" remote path.
const SERVER_ACTIONS = new Set([
  "ansible.builtin.shell",
  "ansible.builtin.fetch",
  "ansible.builtin.package", // pure dispatcher: routes to apt/dnf/apk/… by fact
]);

// Modules we knowingly do not emit: controller-side control-flow / meta / strategy
// plugins with no host module, and real modules needing controller work not yet
// enabled. Anything not emitted and not listed here makes codegen throw, so skips
// stay a conscious decision rather than silent gaps.
const SKIP = new Set<string>([
  // Control-flow / meta / strategy plugins — no remote module, run controller-side.
  "ansible.builtin.import_role",
  "ansible.builtin.include_role",
  "ansible.builtin.import_tasks",
  "ansible.builtin.include_tasks",
  "ansible.builtin.import_playbook",
  "ansible.builtin.include_vars",
  "ansible.builtin.set_fact",
  "ansible.builtin.set_stats",
  "ansible.builtin.pause",
  "ansible.builtin.fail",
  "ansible.builtin.assert",
  "ansible.builtin.debug",
  "ansible.builtin.meta",
  "ansible.builtin.group_by",
  "ansible.builtin.add_host",
  "ansible.builtin.gather_facts",
  "ansible.builtin.validate_argument_spec",
  // Real modules needing controller-side work (file transfer / connection / reboot)
  // not yet implemented — candidates for future action/delegate support.
  "ansible.builtin.template",
  "ansible.builtin.script",
  "ansible.builtin.raw",
  "ansible.builtin.reboot",
  "ansible.builtin.wait_for_connection",
  "community.general.shutdown",
]);

// Everything is emitted as a plain remote module — the server owns ansible and runs
// the real action plugin (copy, service dispatch, shell, fetch, …) by fqcn. A style
// "old" module has no shippable payload; we still emit it if the server handles it
// (SERVER_ACTIONS), otherwise it must be in SKIP.
function kindOf(m: ModuleGen): string | null {
  if (m.style === "new") return "remote";
  if (SERVER_ACTIONS.has(m.fqcn)) return "remote";
  return null;
}

// --- identifiers & types --------------------------------------------------

const JS_RESERVED = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
  "let",
  "static",
  "await",
  "async",
  "implements",
  "interface",
  "package",
  "private",
  "protected",
  "public",
]);

const ANSIBLE_TO_TS: Record<string, string> = {
  str: "string",
  string: "string",
  bool: "boolean",
  int: "number",
  float: "number",
  path: "string",
  raw: "unknown",
  jsonarg: "unknown",
  json: "unknown",
  dict: "Record<string, unknown>",
  list: "unknown[]",
  bits: "number",
  bytes: "number",
  sid: "string",
};

/** Binding names must dodge reserved words; object keys only need quoting when not identifiers. */
const safeBinding = (name: string) =>
  JS_RESERVED.has(name) ? `${name}_` : name;
const isIdent = (s: string) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s);
const shortName = (fqcn: string) => fqcn.split(".").at(-1)!;

const pascal = (name: string) =>
  name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

function tsType(opt: AnsibleOption): string {
  const { choices } = opt;
  if (Array.isArray(choices) && choices.every((c) => typeof c === "string"))
    return choices.map((c) => `"${c}"`).join(" | ");

  const t = opt.type ?? "str";
  if (t === "list") {
    const el = opt.elements;
    const inner =
      typeof el === "string"
        ? (ANSIBLE_TO_TS[el] ?? "unknown")
        : (ANSIBLE_TO_TS[el?.type ?? "str"] ?? "unknown");
    return `${inner} | ${inner}[]`;
  }
  if (t === "dict" && opt.suboptions) return emitSuboptions(opt.suboptions, 2);
  return ANSIBLE_TO_TS[t] ?? "unknown";
}

function emitSuboptions(
  subs: Record<string, AnsibleOption>,
  indent: number,
): string {
  const pad = " ".repeat(indent);
  const lines = ["{"];
  for (const [name, opt] of Object.entries(subs).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const key = isIdent(name) ? name : `"${name}"`;
    lines.push(`${pad}  ${key}${opt.required ? "" : "?"}: ${tsType(opt)};`);
  }
  lines.push(`${pad}}`);
  return lines.join("\n");
}

function emitInterface(
  name: string,
  opts: Record<string, AnsibleOption>,
): string {
  if (!opts || Object.keys(opts).length === 0)
    return `export type ${name} = Record<string, unknown>;`;

  const lines = [`export interface ${name} {`];
  for (const [optName, opt] of Object.entries(opts).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const d = Array.isArray(opt.description)
      ? opt.description[0]
      : opt.description;
    if (d) lines.push(`  /** ${d.replace(/\*\//g, "* /")} */`);
    const key = isIdent(optName) ? optName : `"${optName}"`;
    lines.push(`  ${key}${opt.required ? "" : "?"}: ${tsType(opt)};`);
  }
  lines.push("}");
  return lines.join("\n");
}

// --- per-module emitters --------------------------------------------------

const preamble = (fqcn: string) =>
  `// Auto-generated from: ${fqcn}\n// DO NOT EDIT — regenerate with codegen`;

function emitMeta(m: ModuleGen): Code {
  return code`const meta: ${AnsibleModuleMeta} = ${JSON.stringify(m.meta)} as const;`;
}

function emitRemoteSpec(m: ModuleGen, collection?: CollectionPin): Code {
  // The pinned collection the server installs before running; omitted for core.
  const collectionLine = collection
    ? code`
  collection: ${JSON.stringify(collection)},`
    : code``;
  return code`const spec: ${RemoteModuleSpec} = {
  fqcn: ${JSON.stringify(m.fqcn)},${collectionLine}
} as const;`;
}

function emitModule(m: ModuleGen, collection?: CollectionPin): Code {
  const short = shortName(m.fqcn);
  const fn = safeBinding(short);
  const Args = `${pascal(short)}Args`;
  const Return = `${pascal(short)}Return`;
  const types = `${emitInterface(Args, m.options)}\n\n${emitInterface(Return, m.returndocs)}`;

  return code`
${preamble(m.fqcn)}
${emitMeta(m)}
${emitRemoteSpec(m, collection)}
${types}
export const ${fn} = ${defineRemoteModule}<${Args}, ${Return}>(spec, meta);
`;
}

// --- public API -----------------------------------------------------------

/** Render a collection's modules to a filename → source map (modules, shared artifacts, barrel). */
export function emitCollection(
  result: CodegenResult,
  collection?: CollectionPin,
): Map<string, string> {
  const out = new Map<string, string>();
  const emitted: ModuleGen[] = [];
  const unexpected: string[] = [];
  for (const m of result.modules) {
    if (SKIP.has(m.fqcn)) {
      console.error(`  skip  ${m.fqcn}`);
      continue;
    }
    const kind = kindOf(m);
    if (!kind) {
      unexpected.push(m.fqcn);
      continue;
    }
    out.set(`${shortName(m.fqcn)}.ts`, emitModule(m, collection).toString());
    emitted.push(m);
    console.error(`  emit  ${kind.padEnd(10)} ${m.fqcn}`);
  }

  if (unexpected.length)
    throw new Error(
      `codegen: ${unexpected.length} module(s) neither emitted nor in SKIP — ` +
        `add each to SKIP (in emit.ts) or give it handling:\n` +
        unexpected.map((f) => `  ${f}`).join("\n"),
    );

  const barrel = joinCode(
    emitted.map((m) => code`export * from "./${shortName(m.fqcn)}.ts";`),
    { on: "\n" },
  );
  out.set(
    "index.ts",
    `// Auto-generated barrel — DO NOT EDIT\n\n${barrel.toString()}\n`,
  );
  return out;
}
