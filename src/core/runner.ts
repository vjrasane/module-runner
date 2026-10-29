import { withOptions } from "src/core/context.ts";
import { host, HostRef } from "src/core/host.ts";
import type { SSHConfig } from "src/core/connection.ts";
import { ModuleExecOpts } from "src/module/module.ts";
import { FatalError } from "./errors.ts";
import {
  defaultEventHandler,
  EventHandler,
  SpanEvent,
} from "src/core/events.ts";
import { Logger, logReporter } from "./logger.ts";

export class Runner {
  private fatal: FatalError | null = null;

  constructor(
    private opts: ModuleExecOpts = {},
    private _handler?: EventHandler,
  ) {}

  private get handler(): EventHandler {
    return this._handler ?? defaultEventHandler;
  }

  run<T>(fn: () => Promise<T>): Promise<T> {
    return withOptions(this.opts, async () => {
      try {
        const r = await fn();
        if (this.fatal) throw this.fatal;
        return r;
      } catch (e) {
        throw this.fatal ?? e;
      }
    });
  }

  host(name: string, cfg?: Partial<SSHConfig>): HostRef {
    return host(name, cfg, this);
  }

  emit(event: SpanEvent) {
    try {
      return this.handler(event);
    } catch (err) {
      console.error(`[reporter error] ${String(err)}`);
    }
  }

  setOpts(opts: ModuleExecOpts) {
    this.opts = opts;
  }

  setHandler(handler: EventHandler) {
    this._handler = handler;
  }

  setLogger(logger: Logger) {
    this._handler = logReporter(logger);
  }

  setFatal(err: FatalError) {
    this.fatal = err;
  }
}

export let defaultRunner = new Runner();

export function setDefaultRunner(runner: Runner): void {
  defaultRunner = runner;
}
