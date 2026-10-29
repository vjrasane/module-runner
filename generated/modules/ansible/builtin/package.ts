import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.package
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.package",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": false,
  "checkMode": "N/A",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.package" } as const;
export interface PackageArgs {
  /** Package name, or package specifier with version. */
  name: string;
  /** Whether to install (V(present)), or remove (V(absent)) a package. */
  state: string;
  /** The required package manager module to use (V(dnf), V(apt), and so on). The default V(auto) will use existing facts or try to auto-detect it. */
  use?: string;
}

export type PackageReturn = Record<string, unknown>;
export const package_ = defineRemoteModule<PackageArgs, PackageReturn>(spec, meta);
