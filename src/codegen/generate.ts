#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { emitCollection } from "./emit.ts";
import { runJob } from "./lib.ts";
import { bootstrap } from "src/core/server.ts";

// `module-runner-generate <collection> [--version X] [--out DIR]`: generate the TypeScript
// bindings (typed args/returns) for a community collection into the caller's own repo.
// Each module emits only its identity + the pinned collection version — the server owns
// ansible-core and builds the execution payload, so no module source is shipped.
interface Args {
  collection: string;
  version?: string;
  out: string;
}

function parseArgs(argv: string[]): Args {
  const rest = argv.slice(2);
  const collection = rest.find((a) => !a.startsWith("--"));
  if (!collection) {
    console.error(
      "usage: module-runner-generate <collection> [--version <v>] [--out <dir>]",
    );
    process.exit(2);
  }
  const flag = (name: string) => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : undefined;
  };
  const out =
    flag("out") ?? path.join(process.cwd(), "ansible", ...collection.split("."));
  return { collection, version: flag("version"), out };
}

async function main() {
  const { collection, version, out } = parseArgs(process.argv);

  // Introspect under the server venv's ansible-core (the same pinned runtime the server
  // uses), so generation needs no system python/ansible — only the bootstrapped venv.
  // The server also installs the collection (latest when no --version) and reports the
  // version it resolved to; that is the pin stamped onto the emitted bindings.
  const python = await bootstrap();
  const result = await runJob({ collection, version }, python);
  if (result.version === null)
    throw new Error(`${collection}: server resolved no version to pin`);

  const files = emitCollection(result, {
    name: result.collection,
    version: result.version,
  });

  await mkdir(out, { recursive: true });
  await Promise.all(
    [...files].map(([name, src]) => writeFile(path.join(out, name), src)),
  );
  console.error(`generated ${collection}@${result.version} → ${out}`);
}

main();
