import { describe, expect, test } from "vitest";
import { AsyncLocalStorage } from "node:async_hooks";
import { Host } from "./host.ts";

describe("Host.run()", () => {
  // A duplicate core instance (dynamically-imported chunk resolved to a separate
  // module URL) re-runs the same `Symbol.for` anchor and must see run()'s store,
  // or currentContext() falls back to localhost and modules run on the wrong host.
  test("store is visible through the globally-anchored storage", async () => {
    const h = new Host("h", { type: "local" });
    const seen = await h.run(async () => {
      const dup = (globalThis as any)[
        Symbol.for("module-runner#execStorage")
      ] as AsyncLocalStorage<{ host: { name: string } }>;
      return dup.getStore()?.host.name;
    });
    expect(seen).toBe("h");
  });
});
