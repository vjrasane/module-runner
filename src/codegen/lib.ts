import { spawn } from "node:child_process";
import { hermeticEnv } from "src/core/server.ts";
import type { CodegenResult } from "./emit.ts";

// Introspection lives in the GPL server package (it imports ansible); we run it via the
// venv python that pip-installed that package, not a shipped script file. The server owns
// collection acquisition too — introspect installs the collection into its own tree (the
// same one `run` uses) via the shared CollectionCache, so the client ships no Galaxy code.
const INTROSPECT_MODULE = "ansible_jsonrpc_server.introspect";

export interface Job {
  collection: string;
  version?: string; // omit → server installs latest and reports the resolved version
  source?: string; // non-default galaxy / Automation Hub
}

export async function runJob(
  job: Job,
  pythonPath: string,
): Promise<CodegenResult> {
  const chunks: Buffer[] = [];
  await new Promise<void>((res, rej) => {
    const child = spawn(
      pythonPath,
      ["-m", INTROSPECT_MODULE, JSON.stringify(job)],
      // hermetic: the venv's pinned ansible-core must win over any devenv PYTHONPATH.
      { stdio: ["ignore", "pipe", "inherit"], env: hermeticEnv() },
    );

    child.stdout.on("data", (chunk: Buffer) => chunks.push(chunk));
    child.on("error", rej);
    child.on("close", (code) =>
      code === 0
        ? res()
        : rej(
            new Error(
              `${INTROSPECT_MODULE} exited ${code} for ${job.collection}`,
            ),
          ),
    );
  });

  return JSON.parse(Buffer.concat(chunks).toString("utf-8")) as CodegenResult;
}
