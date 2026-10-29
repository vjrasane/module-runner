import { describe, expect, test } from "vitest";
import { finalizeResult } from "src/module/remote.ts";
import { ModuleError, type RawResult } from "src/module/module.ts";

const raw = (over: Partial<RawResult<any>>): RawResult<any> => ({
  changed: false,
  failed: false,
  skipped: false,
  invocation: {},
  ...over,
});

describe("finalizeResult", () => {
  test("throws ModuleError on a failed result by default", () => {
    expect(() => finalizeResult("x", raw({ failed: true }), false)).toThrow(
      ModuleError,
    );
  });

  test("returns the failed result (not throwing) when ignoreErrors", () => {
    const r = finalizeResult(
      "x",
      raw({ failed: true, changed: true, rc: 1 } as any),
      true,
    );
    expect(r.failed).toBe(true);
    expect(r.status).toBe("failed");
    expect((r as any).rc).toBe(1);
  });

  test("maps a non-failed result to ok/changed", () => {
    expect(finalizeResult("x", raw({ changed: true }), false).status).toBe(
      "changed",
    );
    expect(finalizeResult("x", raw({}), false).status).toBe("ok");
  });
});
