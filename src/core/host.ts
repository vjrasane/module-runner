import { ConnectionSpec, SSHConfig } from "src/core/connection.ts";
import { withContext } from "src/core/context.ts";
import { Runner, defaultRunner } from "src/core/runner.ts";

export interface HostRef {
  // Per-instance identity: unique even when two hosts share a name, so a host present in
  // several groups collapses to one while same-named distinct hosts stay separate.
  readonly id: symbol;
  readonly name: string;
  run<T>(fn: () => Promise<T>): Promise<T>;
}

export class Host implements HostRef {
  readonly id: symbol;

  constructor(
    public readonly name: string,
    public readonly connection: ConnectionSpec,
    public readonly _runner?: Runner,
  ) {
    this.id = Symbol(name);
  }

  get runner(): Runner {
    return this._runner ?? defaultRunner;
  }

  run<T>(fn: () => Promise<T>): Promise<T> {
    return this.runner.run(() => withContext({ host: this, opts: {} }, fn));
  }
}

export function host(
  name: string,
  cfg: Partial<SSHConfig> = {},
  runner?: Runner,
): HostRef {
  const config: SSHConfig = { ...cfg, host: cfg.host ?? name };
  return new Host(name, { type: "ssh", config }, runner);
}

export const localhost = new Host("localhost", { type: "local" });
