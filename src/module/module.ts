import { BecomeOpts } from "src/core/connection.ts";
import { currentRunner, withOptions, withSpan } from "src/core/context.ts";
import { isFatal } from "src/core/errors.ts";

export type ModuleStatus = "ok" | "changed" | "failed" | "skipped";

export type ModuleSkippedResult<TReturn> = Partial<TReturn> & {
  status: "skipped";
  changed: false;
  failed: false;
  skipped: true;
};

export type ModuleRanResult<TReturn> = RawResult<TReturn> & {
  status: "ok" | "changed";
  changed: boolean;
  failed: false;
  skipped: false;
};

export type ModuleFailedResult<TReturn> = RawResult<TReturn> & {
  status: "failed";
  changed: boolean;
  failed: true;
  skipped: false;
};

export type RawResult<TReturn> = TReturn & {
  changed: boolean;
  failed: boolean;
  skipped: boolean;
  invocation: Record<string, unknown>;
  warnings?: string[];
};

export type ModuleResult<TReturn> =
  | ModuleRanResult<TReturn>
  | ModuleFailedResult<TReturn>
  | ModuleSkippedResult<TReturn>;

export class ModuleError extends Error {
  constructor(
    fdcn: string,
    public readonly result: RawResult<any>,
  ) {
    super(`Module ${fdcn} failed with result: ${JSON.stringify(result)}`);
  }
}

export interface ModuleSpec {}

export interface ModuleExecOpts {
  check?: boolean;
  diff?: boolean;
  noLog?: boolean;
  become?: boolean | BecomeOpts;
  env?: Record<string, string>;
  ignoreErrors?: boolean;
}

export interface Module<TArgs extends Record<string, any>, TReturn> {
  displayName: string;
  exec(
    name: string | undefined,
    args: TArgs,
    opts?: ModuleExecOpts,
  ): Promise<ModuleResult<TReturn>>;
}

export type ModuleFn<TArgs, TReturn> = {} extends TArgs
  ? {
      (args?: TArgs, opts?: ModuleExecOpts): Promise<ModuleResult<TReturn>>;
      (
        name: string,
        args?: TArgs,
        opts?: ModuleExecOpts,
      ): Promise<ModuleResult<TReturn>>;
    }
  : {
      (args: TArgs, opts?: ModuleExecOpts): Promise<ModuleResult<TReturn>>;
      (
        name: string,
        args: TArgs,
        opts?: ModuleExecOpts,
      ): Promise<ModuleResult<TReturn>>;
    };

export interface AnsibleModuleMeta {
  fqcn: string;
  actionPlugin: boolean;
  powershell: boolean;
  rawParams: boolean;
  checkMode: "full" | "partial" | "none" | "N/A";
}

export function getModuleFn<TArgs extends Record<string, any>, TReturn>(
  mod: Module<TArgs, TReturn>,
): ModuleFn<TArgs, TReturn> {
  function fn(
    a?: string | TArgs,
    b?: TArgs | ModuleExecOpts,
    c?: ModuleExecOpts,
  ) {
    const named = typeof a === "string";
    const name = named ? a : undefined;
    const args = (named ? b : a) as TArgs | undefined;
    const opts = (named ? c : b) as ModuleExecOpts | undefined;
    return withSpan("step", name ?? mod.displayName, async () => {
      try {
        return await mod.exec(name, (args ?? {}) as TArgs, opts);
      } catch (e) {
        if (isFatal(e)) currentRunner().setFatal(e);
        throw e;
      }
    });
  }
  return fn;
}

export function define<
  TFunc extends (...args: any[]) => Promise<TReturn>,
  TReturn,
>(
  name: string,
  fn: TFunc,
  opts?: ModuleExecOpts,
): (...args: Parameters<TFunc>) => Promise<TReturn> {
  return async (...args: Parameters<TFunc>): Promise<TReturn> => {
    const { value } = await withSpan("step", name, () =>
      withOptions(opts ?? {}, () =>
        fn(args).then((value) => ({ value, status: "ok", changed: undefined })),
      ),
    );
    return value;
  };
}
