import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.known_hosts
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.known_hosts",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.known_hosts" } as const;
export interface KnownHostsArgs {
  /** Hash the hostname in the known_hosts file. */
  hash_host?: boolean;
  /** The SSH public host key, as a string. */
  key?: string;
  /** The host to add or remove (must match a host specified in key). It will be converted to lowercase so that C(ssh-keygen) can find it. */
  name: string;
  /** The known_hosts file to edit. */
  path?: string;
  /** V(present) to add host keys. */
  state?: "absent" | "present";
}

export type KnownHostsReturn = Record<string, unknown>;
export const known_hosts = defineRemoteModule<KnownHostsArgs, KnownHostsReturn>(spec, meta);
