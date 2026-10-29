import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.hostname
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.hostname",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.hostname" } as const;
export interface HostnameArgs {
  /** Name of the host. */
  name: string;
  /** Which strategy to use to update the hostname. */
  use?:
    | "alpine"
    | "debian"
    | "freebsd"
    | "generic"
    | "macos"
    | "macosx"
    | "darwin"
    | "openbsd"
    | "openrc"
    | "redhat"
    | "sles"
    | "solaris"
    | "systemd";
}

export type HostnameReturn = Record<string, unknown>;
export const hostname = defineRemoteModule<HostnameArgs, HostnameReturn>(spec, meta);
