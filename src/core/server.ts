import { execFile, spawn, type ChildProcess } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import {
  createMessageConnection,
  type MessageConnection,
  ParameterStructures,
  StreamMessageReader,
  StreamMessageWriter,
} from "vscode-jsonrpc/node";
import {
  BOOTSTRAP_SHA256,
  BOOTSTRAP_URL,
  SERVER_VERSION,
} from "src/constants.ts";

const execFileAsync = promisify(execFile);

export interface BootstrapOptions {
  python?: string; // explicit interpreter; else the script discovers python3.13→3.11
  env?: NodeJS.ProcessEnv; // XDG_DATA_HOME (venv) + XDG_CACHE_HOME (cached script)
}

function sha256(b: Buffer): string {
  return createHash("sha256").update(b).digest("hex");
}

// Resolve the bootstrap script to a local path: a dev-provided override, else the pinned
// release fetched from its versioned raw URL, cached under XDG_CACHE and integrity-checked.
// The script lives in the server repo (client-agnostic), so clients fetch it, not bundle it.
async function resolveBootstrapScript(env: NodeJS.ProcessEnv): Promise<string> {
  const override = env.ANSIBLE_JSONRPC_BOOTSTRAP_SH;
  if (override) return override;

  const cacheHome = env.XDG_CACHE_HOME ?? join(homedir(), ".cache");
  const dir = join(cacheHome, "ansible-jsonrpc-server");
  const dest = join(dir, `bootstrap-v1-${SERVER_VERSION}.sh`);

  try {
    const cached = await readFile(dest);
    if (sha256(cached) === BOOTSTRAP_SHA256) return dest;
  } catch {
    // not cached (or unreadable) → fetch below
  }

  const res = await fetch(BOOTSTRAP_URL);
  if (!res.ok) throw new Error(`bootstrap: GET ${BOOTSTRAP_URL} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const got = sha256(buf);
  if (got !== BOOTSTRAP_SHA256)
    throw new Error(
      `bootstrap: sha256 mismatch for ${BOOTSTRAP_URL} (expected ${BOOTSTRAP_SHA256}, got ${got})`,
    );
  await mkdir(dir, { recursive: true });
  await writeFile(dest, buf);
  return dest;
}

// Provision the server runtime and return the venv python to spawn. Fetches (once, then
// cached) the pinned bootstrap script, integrity-checks it, and runs it with SERVER_VERSION;
// the script creates a version-keyed venv with `ansible-jsonrpc-server==SERVER_VERSION`
// pip-installed. Idempotent: a provisioned venv is a fast no-op.
export async function bootstrap(opts: BootstrapOptions = {}): Promise<string> {
  const env = opts.env ?? process.env;
  const script = await resolveBootstrapScript(env);
  const args = [script, SERVER_VERSION];
  if (opts.python) args.push(opts.python);
  // Run the bootstrap hermetically, same as the server spawn: a surrounding devenv puts
  // its own ansible-core (+ other pkgs) on PYTHONPATH, which the venv's pip would see as
  // "already satisfied" and skip installing those deps INTO the venv — leaving it broken
  // once the server runs with PYTHONPATH stripped (e.g. missing jinja2). Stripping it here
  // makes pip install every dep into the venv, and makes the .ready integrity check see
  // only the venv rather than the leaked packages.
  const { stdout } = await execFileAsync("sh", args, {
    encoding: "utf8",
    env: hermeticEnv(env),
  });
  const lines = stdout.trim().split(/\r?\n/).filter(Boolean);
  return lines[lines.length - 1]!; // last line = venv python path
}

export interface HostSpec {
  id?: string;
  connection: { type: string; vars?: Record<string, unknown> };
  become?: Record<string, unknown>;
  gather_subset?: string[];
}

export interface GatherFactsParams {
  host: HostSpec;
  vars?: Record<string, unknown>;
}

export type Facts = Record<string, unknown>;

export interface RunActionParams {
  host: HostSpec;
  fqcn: string;
  args?: Record<string, unknown>;
  vars?: Record<string, unknown>;
  flags?: Record<string, unknown>;
  // Pinned collection to install server-side before running (omit for ansible.builtin).
  collection?: { name: string; version: string; source?: string };
}

export type ActionStatus = "ok" | "failed" | "unreachable" | "skipped";

export interface ResultFrame {
  status: ActionStatus;
  changed: boolean;
  result: Record<string, unknown>;
  warnings: string[];
  deprecations: string[];
}

// A server→client `progress` notification (design §4.5.1): internal events not tied to
// a single reply — cache/collection installs, fact warmups. `token` correlates begin↔end.
export interface ProgressNotification {
  kind: string; // "collection" | "facts" | …
  token: string;
  phase: "begin" | "end";
  ok?: boolean;
  requestId?: unknown;
  name?: string;
  version?: string;
  host?: string;
  subset?: string[];
}

// Drop the python path-pollution vars so the spawned venv resolves packages only from
// itself (children inherit this, so the forkserver/workers stay clean too).
export function hermeticEnv(env?: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const { PYTHONPATH: _p, PYTHONHOME: _h, ...rest } = env ?? process.env;
  return { ...rest, PYTHONNOUSERSITE: "1" };
}

// Thin client that owns one GPL ansible-jsonrpc-server child and talks to it over
// the JSON-RPC stdio seam. The server is confined to its own process; this module
// imports neither ansible nor the server (licensing firewall, design §9).
export class ServerClient {
  private readonly child: ChildProcess;
  private readonly conn: MessageConnection;
  private inflight = 0;

  constructor(
    pythonPath: string,
    opts: {
      cwd?: string;
      env?: NodeJS.ProcessEnv;
      onProgress?: (p: ProgressNotification) => void;
    } = {},
  ) {
    this.child = spawn(pythonPath, ["-m", "ansible_jsonrpc_server"], {
      // stderr inherited so server diagnostics surface; stdin/stdout are the seam.
      stdio: ["pipe", "pipe", "inherit"],
      cwd: opts.cwd,
      // Keep the venv hermetic: a surrounding nix/devenv puts its own ansible-core on
      // PYTHONPATH (prepended to sys.path), which would shadow the venv's pinned
      // version. Strip it so the server + its forkserver/workers use only the venv.
      env: hermeticEnv(opts.env),
    });
    this.conn = createMessageConnection(
      new StreamMessageReader(this.child.stdout!),
      new StreamMessageWriter(this.child.stdin!),
    );
    if (opts.onProgress) this.conn.onNotification("progress", opts.onProgress);
    this.conn.listen();
    // The server is a background helper: it must not hold node's event loop open. Unref
    // the child + pipes so, once the caller's own work is done and no request is in
    // flight, node exits (and teardown below + the server's lifeline reap it). ref() is
    // re-applied per in-flight request so a pending call still keeps node alive.
    this.child.unref();
    this.setStreamsRef(false);
  }

  // child stdio are net.Socket at runtime (have ref/unref) but typed as Readable/Writable.
  private setStreamsRef(on: boolean): void {
    for (const s of [this.child.stdout, this.child.stdin] as unknown as Array<{
      ref?(): void;
      unref?(): void;
    } | null>) {
      if (on) s?.ref?.();
      else s?.unref?.();
    }
  }

  private async request<T>(method: string, params: object): Promise<T> {
    if (this.inflight++ === 0) this.setStreamsRef(true);
    try {
      return await this.conn.sendRequest(method, ParameterStructures.byName, params);
    } finally {
      if (--this.inflight === 0) this.setStreamsRef(false);
    }
  }

  runAction(params: RunActionParams): Promise<ResultFrame> {
    return this.request("runAction", params);
  }

  gatherFacts(params: GatherFactsParams): Promise<Facts> {
    return this.request("gatherFacts", params);
  }

  async close(): Promise<void> {
    try {
      await this.conn.sendNotification("shutdown");
    } catch {
      // server may already be gone; fall through to teardown
    }
    this.conn.dispose();
    this.child.kill();
  }
}
