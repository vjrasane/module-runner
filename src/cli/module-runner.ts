#!/usr/bin/env node
import { run as generate } from "src/codegen/generate.ts";

// `module-runner <command> [args]` — dispatch on the first token, forward the rest.
const commands: Record<string, (args: string[]) => Promise<void>> = {
  generate,
};

const [command, ...rest] = process.argv.slice(2);
const handler = command ? commands[command] : undefined;

if (!handler) {
  console.error(
    [
      "usage: module-runner <command> [args]",
      "",
      "commands:",
      "  generate <collection> [--version <v>] [--out <dir>]   emit typed bindings",
    ].join("\n"),
  );
  process.exit(2);
}

handler(rest).catch((err) => {
  console.error(err);
  process.exit(1);
});
