import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.dpkg_selections
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.dpkg_selections",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.dpkg_selections" } as const;
export interface DpkgSelectionsArgs {
  /** Name of the package. */
  name: string;
  /** The selection state to set the package to. */
  selection: "install" | "hold" | "deinstall" | "purge";
}

export type DpkgSelectionsReturn = Record<string, unknown>;
export const dpkg_selections = defineRemoteModule<DpkgSelectionsArgs, DpkgSelectionsReturn>(spec, meta);
