import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.slurp
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.slurp",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.slurp" } as const;
export interface SlurpArgs {
  /** The file on the remote system to fetch. This I(must) be a file, not a directory. */
  src: string;
}

export interface SlurpReturn {
  /** Encoded file content */
  content?: string;
  /** Type of encoding used for file */
  encoding?: string;
  /** Actual path of file slurped */
  source?: string;
}
export const slurp = defineRemoteModule<SlurpArgs, SlurpReturn>(spec, meta);
