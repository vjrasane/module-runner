import { afterAll, beforeAll, expect, test } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { bootstrap, ServerClient } from "./server.ts";

// Integration test: bootstrap a real isolated venv (script fetched from the pinned
// release, package installed from PyPI), then drive the server in it. Lets bootstrap
// auto-discover a python3.11+ off PATH — no devenv assumption.
const xdg = mkdtempSync(path.join(tmpdir(), "ajs-bootstrap-"));
const env = { ...process.env, XDG_DATA_HOME: xdg, XDG_CACHE_HOME: xdg };

let client: ServerClient;
let python: string;

beforeAll(async () => {
  python = await bootstrap({ env });
  client = new ServerClient(python, { env }); // no cwd hack — package is pip-installed
}, 120_000);

afterAll(async () => {
  await client.close();
  rmSync(xdg, { recursive: true, force: true });
});

test(
  "runAction ansible.builtin.ping on local → pong",
  async () => {
    const res = await client.runAction({
      host: { connection: { type: "local", vars: {} }, become: {} },
      fqcn: "ansible.builtin.ping",
      args: {},
      vars: { ansible_python_interpreter: python },
    });
    expect(res.status).toBe("ok");
    expect(res.result.ping).toBe("pong");
  },
  30_000,
);

test(
  "runAction command echo → changed + stdout",
  async () => {
    const res = await client.runAction({
      host: { connection: { type: "local", vars: {} }, become: {} },
      fqcn: "ansible.builtin.command",
      args: { _raw_params: "echo hi" },
      vars: { ansible_python_interpreter: python },
    });
    expect(res.status).toBe("ok");
    expect(res.changed).toBe(true);
    expect(res.result.stdout).toBe("hi");
  },
  30_000,
);

test(
  "gatherFacts on local returns real facts",
  async () => {
    const facts = await client.gatherFacts({
      host: {
        id: "local",
        connection: { type: "local", vars: {} },
        become: {},
        gather_subset: ["min"],
      },
      vars: { ansible_python_interpreter: python },
    });
    expect(facts.ansible_system).toBeDefined();
  },
  30_000,
);
