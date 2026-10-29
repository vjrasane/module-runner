import type { BecomeOpts } from "src/core/connection.ts";
import { emit, toSpanError } from "src/core/events.ts";
import type { HostFacts } from "src/core/facts.ts";
import type { Host } from "src/core/host.ts";
import {
  bootstrap,
  type ProgressNotification,
  ServerClient,
  type HostSpec,
} from "src/core/server.ts";

// The server-execution backend (design §4): all module runs go through one long-lived
// ansible-jsonrpc-server, replacing the in-TS AnsiballZ path. Lazily bootstrapped and
// shared process-wide. Only local connections are wired so far (ssh/collections next).

// The bootstrap promise is anchored on globalThis (like the ALS store in context.ts)
// so a duplicate core instance — tsx can resolve a dynamically-imported chunk's
// `module-runner` to a different module URL than the static graph — shares the one
// server rather than spawning a second.
const SERVER_KEY = Symbol.for("module-runner#serverClient");
const g = globalThis as unknown as Record<
  symbol,
  Promise<ServerClient> | undefined
>;

// Surface the server's own internal events (collection installs, fact warmups) and the
// bootstrap through the global SpanEvent handler — the same stream module runs use — as
// top-level, host-less "fetch"/"payload" spans (they're not tied to one module run).
// begin carries name/version; end carries only token/ok — so remember the begin by token.
const spanStart = new Map<string, { t0: number; name: string }>();

function reportProgress(p: ProgressNotification): void {
  const kind = p.kind === "facts" ? "payload" : "fetch"; // facts warmups are noisy → debug
  if (p.phase === "begin") {
    const name = progressName(p);
    spanStart.set(p.token, { t0: Date.now(), name });
    emit({ kind, name, host: "", id: p.token, phase: "start", at: Date.now() });
    return;
  }
  const s = spanStart.get(p.token);
  spanStart.delete(p.token);
  emit({ kind, name: s?.name ?? progressName(p), host: "", id: p.token, phase: "end",
         at: Date.now(), status: p.ok === false ? "failed" : "ok",
         ms: Date.now() - (s?.t0 ?? Date.now()) });
}

function progressName(p: ProgressNotification): string {
  if (p.kind === "collection")
    return `install collection ${p.name ?? ""}${p.version ? ":" + p.version : ""}`;
  if (p.kind === "facts") return `gather facts ${p.host ?? ""}`.trimEnd();
  return p.token;
}

async function provision(): Promise<string> {
  const t0 = Date.now();
  emit({ kind: "fetch", name: "bootstrap server runtime", host: "", id: "bootstrap",
         phase: "start", at: t0 });
  try {
    const py = await bootstrap();
    emit({ kind: "fetch", name: "bootstrap server runtime", host: "", id: "bootstrap",
           phase: "end", at: Date.now(), status: "ok", ms: Date.now() - t0 });
    return py;
  } catch (e) {
    emit({ kind: "fetch", name: "bootstrap server runtime", host: "", id: "bootstrap",
           phase: "end", at: Date.now(), status: "failed", ms: Date.now() - t0,
           error: toSpanError(e) });
    throw e;
  }
}

async function initServerClient(): Promise<ServerClient> {
  const py = await provision();
  const client = new ServerClient(py, { onProgress: reportProgress });
  process.once("exit", () => void client.close()); // lifeline also covers EOF
  return client;
}

export function getServer(): Promise<ServerClient> {
  let p = g[SERVER_KEY];
  if (p == null) {
    p = initServerClient();
    p.catch(() => {}); // mark handled: awaiters still see the rejection, but an eager
    g[SERVER_KEY] = p; // start with no awaiter yet must not crash as unhandledRejection
  }
  return p;
}

// Warm the server eagerly on import so the venv bootstrap + spawn overlap with the
// caller's own setup (reading secrets, etc.); the first module exec awaits this promise.
getServer();

// Fetch host facts from the server, which gathers via ansible's setup module and keeps
// an in-memory per-host cache. gatherAll=false → the minimal subset; true → everything.
export async function gatherFacts(
  host: Host,
  gatherAll = false,
): Promise<HostFacts> {
  const server = await getServer();
  const spec = hostSpecFor(host);
  spec.gather_subset = [gatherAll ? "all" : "min"];
  return server.gatherFacts({ host: spec, vars: {} }) as Promise<HostFacts>;
}

export function hostSpecFor(
  host: Host,
  become?: boolean | BecomeOpts,
): HostSpec {
  const become_vars = becomeVars(become);
  const conn = host.connection;
  if (conn.type === "local")
    return { id: host.name, connection: { type: "local" }, become: become_vars };
  const cfg = conn.config;  // host already defaulted to the name by host()
  const vars: Record<string, unknown> = { ansible_host: cfg.host };
  if (cfg.user != null) vars.ansible_user = cfg.user;
  if (cfg.port != null) vars.ansible_port = cfg.port;
  if (cfg.identityFile != null) vars.ansible_ssh_private_key_file = cfg.identityFile;
  return { id: host.name, connection: { type: "ssh", vars }, become: become_vars };
}

function becomeVars(become?: boolean | BecomeOpts): Record<string, unknown> {
  if (!become) return {};
  const o = typeof become === "object" ? become : {};
  const vars: Record<string, unknown> = { ansible_become: true };
  if ("mode" in o && o.mode === "su") vars.ansible_become_method = "su";
  if (o.user) vars.ansible_become_user = o.user;
  if ("password" in o && o.password) vars.ansible_become_password = o.password;
  return vars;
}
