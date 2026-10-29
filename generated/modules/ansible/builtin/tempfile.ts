import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.tempfile
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.tempfile",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "none",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.tempfile" } as const;
export interface TempfileArgs {
  /** Location where temporary file or directory should be created. */
  path?: string;
  /** Prefix of file/directory name created by module. */
  prefix?: string;
  /** Whether to create file or directory. */
  state?: "directory" | "file";
  /** Suffix of file/directory name created by module. */
  suffix?: string;
}

export interface TempfileReturn {
  /** Path to created file or directory. */
  path?: string;
}
export const tempfile = defineRemoteModule<TempfileArgs, TempfileReturn>(spec, meta);
