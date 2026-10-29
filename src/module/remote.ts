import { currentContext } from "src/core/context.ts";
import { getServer, hostSpecFor } from "src/core/backend.ts";
import {
  AnsibleModuleMeta,
  getModuleFn,
  Module,
  ModuleError,
  ModuleExecOpts,
  ModuleFn,
  ModuleResult,
  ModuleSkippedResult,
  RawResult,
} from "src/module/module.ts";
import type { ResultFrame } from "src/core/server.ts";

const SKIPPED_RESULT: ModuleSkippedResult<unknown> = {
  status: "skipped",
  changed: false,
  failed: false,
  skipped: true,
} as const;

// The server owns ansible-core and builds its own execution payload, so a module ships
// only its identity: the fqcn and, for non-builtin modules, the pinned collection the
// server installs before running (absent for ansible.builtin, which ships with core).
export interface RemoteModuleSpec {
  fqcn: string;
  collection?: { name: string; version: string };
}

export class RemoteModule<
  TArgs extends Record<string, any>,
  TReturn,
> implements Module<TArgs, TReturn> {
  private readonly collection: RemoteModuleSpec["collection"];

  constructor(
    spec: RemoteModuleSpec,  // the server builds its own payload; we need only the pin
    public readonly meta: AnsibleModuleMeta,
  ) {
    this.collection = spec.collection;
  }

  get displayName(): string {
    return this.meta.fqcn;
  }

  async exec(
    _name: string | undefined,
    args: TArgs,
    moduleOpts: ModuleExecOpts = {},
  ): Promise<ModuleResult<TReturn>> {
    const ctx = currentContext();
    const mergedOpts = { ...ctx.opts, ...moduleOpts };

    // Action plugins now run natively in the server (it owns ansible-core), so no
    // longer rejected here — the server executes `_execute_module` for us.
    if (this.meta.powershell)
      throw new Error(`${this.meta.fqcn} powershell module not supported`);

    if (
      mergedOpts.check &&
      this.meta.checkMode !== "full" &&
      this.meta.checkMode !== "partial"
    )
      return SKIPPED_RESULT;

    const a: Record<string, unknown> = { ...args };
    if (this.meta.rawParams && "cmd" in a) {
      a["_raw_params"] = a["cmd"];
      delete a["cmd"];
    }

    const server = await getServer();
    const frame = await server.runAction({
      host: hostSpecFor(ctx.host, mergedOpts.become),
      fqcn: this.meta.fqcn,
      args: a,
      // No interpreter passed: the server runs ansible's own discovery and caches the
      // result per host (so it's a one-time cost, not per task).
      vars: {},
      flags: {
        check_mode: mergedOpts.check ?? false,
        diff: mergedOpts.diff ?? false,
        no_log: mergedOpts.noLog ?? false,
      },
      // Non-core modules carry their pinned collection; the server installs it first.
      ...(this.collection ? { collection: this.collection } : {}),
    });

    const raw = frameToRaw<TReturn>(frame);
    return finalizeResult(this.meta.fqcn, raw, mergedOpts.ignoreErrors ?? false);
  }
}

// Map the server's result envelope back to the raw module dict finalizeResult expects.
// The server lifts `changed` and a status enum out of the dict; everything else (rc,
// stdout, invocation, …) is the module's own result.
function frameToRaw<TReturn>(frame: ResultFrame): RawResult<TReturn> {
  return {
    ...(frame.result as any),
    changed: frame.changed,
    failed: frame.status !== "ok" && frame.status !== "skipped",
    skipped: frame.status === "skipped",
    invocation: (frame.result as any).invocation ?? {},
    warnings: frame.warnings,
  };
}

// Maps a raw module result to a typed ModuleResult. A failed result throws
// (fail-fast) unless `ignoreErrors`, in which case it is returned so the caller
// can inspect rc/stdout — Ansible's `ignore_errors`.
export function finalizeResult<TReturn>(
  fqcn: string,
  raw: RawResult<TReturn>,
  ignoreErrors: boolean,
): ModuleResult<TReturn> {
  if (raw.failed === true) {
    if (!ignoreErrors) throw new ModuleError(fqcn, raw);
    return { ...raw, status: "failed", failed: true, skipped: false };
  }
  if (raw.skipped === true) return { ...raw, ...SKIPPED_RESULT };
  return {
    ...raw,
    status: raw.changed === true ? "changed" : "ok",
    failed: false,
    skipped: false,
    changed: raw.changed === true,
  };
}

export function defineRemoteModule<TArgs extends Record<string, any>, TReturn>(
  spec: RemoteModuleSpec,
  meta: AnsibleModuleMeta,
): ModuleFn<TArgs, TReturn> {
  const mod = new RemoteModule<TArgs, TReturn>(spec, meta);
  return getModuleFn(mod);
}
