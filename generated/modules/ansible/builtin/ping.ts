import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.ping
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.ping",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.ping" } as const;
export interface PingArgs {
  /** Data to return for the RV(ping) return value. */
  data?: string;
}

export interface PingReturn {
  /** Value provided with the O(data) parameter. */
  ping?: string;
}
export const ping = defineRemoteModule<PingArgs, PingReturn>(spec, meta);
