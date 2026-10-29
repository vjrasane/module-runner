import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { emitCollection } from "./emit.ts";
import { runJob } from "./lib.ts";
import { bootstrap } from "src/core/server.ts";

const GENERATED = path.join(process.cwd(), "generated", "modules");
const outDir = (collection: string) =>
  path.join(GENERATED, ...collection.split("."));

async function main() {
  // ansible.builtin ships with core, so the venv's pinned ansible-core is the whole
  // introspection basis — no collection download or view needed.
  const python = await bootstrap();
  const result = await runJob({ collection: "ansible.builtin" }, python);

  const dir = outDir("ansible.builtin");
  await mkdir(dir, { recursive: true });
  const files = emitCollection(result);
  await Promise.all(
    [...files].map(([name, src]) => writeFile(path.join(dir, name), src)),
  );
}

main();
