import { currentHost, currentRunner } from "src/core/context.ts";
import { Host } from "src/core/host.ts";
import {
  getModuleFn,
  Module,
  ModuleExecOpts,
  ModuleFn,
  ModuleResult,
} from "src/module/module.ts";
import { Runner } from "src/core/runner.ts";

interface CustomModuleContext {
  host: Host;
  runner: Runner;
}

type CustomModuleFn<TArgs, TReturn> = (
  args: TArgs,
  opts: ModuleExecOpts | undefined,
  ctx: CustomModuleContext,
) => Promise<ModuleResult<TReturn>>;

class CustomModule<
  TArgs extends Record<string, any>,
  TReturn,
> implements Module<TArgs, TReturn> {
  constructor(
    public readonly displayName: string,
    private readonly impl: CustomModuleFn<TArgs, TReturn>,
  ) {}

  private get ctx(): CustomModuleContext {
    return {
      host: currentHost(),
      runner: currentRunner(),
    };
  }

  exec(
    name: string | undefined,
    args: TArgs,
    opts?: ModuleExecOpts,
  ): Promise<ModuleResult<TReturn>> {
    return this.impl(args, opts, this.ctx);
  }
}

export function defineCustomModule<TArgs extends Record<string, any>, TReturn>(
  displayName: string,
  impl: CustomModuleFn<TArgs, TReturn>,
): ModuleFn<TArgs, TReturn> {
  const mod = new CustomModule<TArgs, TReturn>(displayName, impl);
  return getModuleFn(mod);
}
