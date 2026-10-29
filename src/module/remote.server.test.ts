import { afterAll, expect, test } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { host, localhost, type Host } from "src/core/host.ts";
import { getServer, gatherFacts, hostSpecFor } from "src/core/backend.ts";
import { defineRemoteModule, type RemoteModuleSpec } from "src/module/remote.ts";
import type { AnsibleModuleMeta } from "src/module/module.ts";

// Integration: the public module API (defineRemoteModule → exec) now runs through the
// ansible-jsonrpc-server backend instead of the in-TS AnsiballZ path. Localhost only.
const mod = (meta: Partial<AnsibleModuleMeta> & { fqcn: string }) => {
  const spec: RemoteModuleSpec = { fqcn: meta.fqcn };
  return defineRemoteModule<any, any>(spec, {
    actionPlugin: false,
    powershell: false,
    rawParams: false,
    checkMode: "none",
    ...meta,
  });
};

const ping = mod({ fqcn: "ansible.builtin.ping" });
const command = mod({ fqcn: "ansible.builtin.command", rawParams: true, checkMode: "partial" });
const copy = mod({ fqcn: "ansible.builtin.copy", actionPlugin: true, checkMode: "full" });

const tmp = mkdtempSync(path.join(tmpdir(), "module-runner-backend-"));

afterAll(async () => {
  (await getServer()).close();
  rmSync(tmp, { recursive: true, force: true });
});

test("hostSpecFor maps ssh config to the ansible connection var bag", () => {
  const h = host("rpi5-01", {
    user: "ubuntu",
    port: 2222,
    identityFile: "/keys/id_ed25519",
  }) as Host;
  expect(hostSpecFor(h, true)).toEqual({
    id: "rpi5-01",
    connection: {
      type: "ssh",
      vars: {
        ansible_host: "rpi5-01",
        ansible_user: "ubuntu",
        ansible_port: 2222,
        ansible_ssh_private_key_file: "/keys/id_ed25519",
      },
    },
    become: { ansible_become: true },
  });
});

test("hostSpecFor defaults ansible_host to the host name, omits unset fields", () => {
  const spec = hostSpecFor(host("web1") as Host);
  expect(spec.connection).toEqual({ type: "ssh", vars: { ansible_host: "web1" } });
  expect(spec.become).toEqual({});
});

test("hostSpecFor maps localhost to a local connection", () => {
  expect(hostSpecFor(localhost).connection).toEqual({ type: "local" });
});

test("ping → pong through the server", async () => {
  const res = await localhost.run(() => ping());
  expect(res.status).toBe("ok");
  expect(res.ping).toBe("pong");
}, 60_000);

test("command echo → changed + stdout", async () => {
  const res = await localhost.run(() => command({ cmd: "echo hi" }));
  expect(res.status).toBe("changed");
  expect(res.stdout).toBe("hi");
}, 30_000);

test("a collection module sends its pinned collection; builtin omits it", async () => {
  const sent: any[] = [];
  const fake = {
    runAction: async (p: any) => {
      sent.push(p);
      return { status: "ok", changed: false, result: {}, warnings: [], deprecations: [] };
    },
  };
  const key = Symbol.for("module-runner#serverClient");
  const prev = (globalThis as any)[key];
  (globalThis as any)[key] = Promise.resolve(fake); // swap in the recorder
  try {
    const dockerPrune = defineRemoteModule<any, any>(
      {
        fqcn: "community.docker.docker_prune",
        collection: { name: "community.docker", version: "5.4.0" },
      },
      { fqcn: "community.docker.docker_prune", actionPlugin: false, powershell: false, rawParams: false, checkMode: "none" },
    );
    await localhost.run(() => dockerPrune());
    await localhost.run(() => mod({ fqcn: "ansible.builtin.ping" })());
  } finally {
    (globalThis as any)[key] = prev;
  }
  expect(sent[0].collection).toEqual({ name: "community.docker", version: "5.4.0" });
  expect(sent[1].collection).toBeUndefined();
});

test("gatherFacts (min) returns facts incl. ansible_user_id/ansible_user_dir", async () => {
  const f = await gatherFacts(localhost, false);
  expect(f.ansible_user_id).toBeDefined();
  expect(f.ansible_user_dir).toBeDefined();
}, 30_000);

test("copy (action plugin) writes a file", async () => {
  const dest = path.join(tmp, "hello.txt");
  const res = await localhost.run(() => copy({ content: "hello\n", dest }));
  expect(res.status).toBe("changed");
  expect(readFileSync(dest, "utf8")).toBe("hello\n");
}, 30_000);
