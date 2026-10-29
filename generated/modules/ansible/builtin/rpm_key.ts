import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.rpm_key
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.rpm_key",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.rpm_key" } as const;
export interface RpmKeyArgs {
  /** The long-form fingerprint of the key being imported. */
  fingerprint?: string | string[];
  /** Key that will be modified. Can be a url, a file on the managed node, or a keyid if the key already exists in the database. */
  key: string;
  /** If the key will be imported or removed from the rpm db. */
  state?: "absent" | "present";
  /** If V(false) and the O(key) is a url starting with V(https), SSL certificates will not be validated. */
  validate_certs?: boolean;
}

export type RpmKeyReturn = Record<string, unknown>;
export const rpm_key = defineRemoteModule<RpmKeyArgs, RpmKeyReturn>(spec, meta);
