import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    // Only ansible.builtin ships with core; community collections are generated into
    // the consumer's own repo by the `module-runner generate` bin.
    "builtin/index": "generated/modules/ansible/builtin/index.ts",
    "cli/generate": "src/codegen/generate.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  outDir: "dist",
  external: ["module-runner"],
});
