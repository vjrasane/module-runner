import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.package_facts
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.package_facts",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.package_facts" } as const;
export interface PackageFactsArgs {
  /** The package manager(s) used by the system so we can query the package information. This is a list and can support multiple package managers per system, since version 2.8. */
  manager?: string | string[];
  /** This option controls how the module queries the package managers on the system. */
  strategy?: string;
}

export interface PackageFactsReturn {
  /** Facts to add to ansible_facts. */
  ansible_facts?: unknown;
}
export const package_facts = defineRemoteModule<PackageFactsArgs, PackageFactsReturn>(spec, meta);
