import { Module, ModuleExecOpts, ModuleResult } from "src/module/module.ts";

class DefineModule<
  TArgs extends Record<string, any>,
  TReturn,
> implements Module<TArgs, TReturn> {
  constructor(public readonly displayName: string) {}

  exec(
    name: string | undefined,
    args: TArgs,
    opts?: ModuleExecOpts,
  ): Promise<ModuleResult<TReturn>> {
    throw new Error("Method not implemented.");
  }
}
