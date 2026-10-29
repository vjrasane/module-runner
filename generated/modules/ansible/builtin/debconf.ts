import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.debconf
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.debconf",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.debconf" } as const;
export interface DebconfArgs {
  /** Name of package to configure. */
  name: string;
  /** A debconf configuration setting. */
  question?: string;
  /** Do not set C(seen) flag when pre-seeding. */
  unseen?: boolean;
  /** Value to set the configuration to. */
  value?: unknown;
  /** The type of the value supplied. */
  vtype?: "boolean" | "error" | "multiselect" | "note" | "password" | "seen" | "select" | "string" | "text" | "title";
}

export type DebconfReturn = Record<string, unknown>;
export const debconf = defineRemoteModule<DebconfArgs, DebconfReturn>(spec, meta);
