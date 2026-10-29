import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.lineinfile
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.lineinfile",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.lineinfile" } as const;
export interface LineinfileArgs {
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Used with O(state=present). */
  backrefs?: boolean;
  /** Create a backup file including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly. */
  backup?: boolean;
  /** Used with O(state=present). */
  create?: boolean;
  /** Used with O(insertafter) or O(insertbefore). */
  firstmatch?: boolean;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** Used with O(state=present). */
  insertafter?: string;
  /** Used with O(state=present). */
  insertbefore?: string;
  /** The line to insert/replace into the file. */
  line?: string;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** The file to modify. */
  path: string;
  /** The regular expression to look for in every line of the file. */
  regexp?: string;
  /** The literal string to look for in every line of the file. This does not have to match the entire line. */
  search_string?: string;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** Whether the line should be there or not. */
  state?: "absent" | "present";
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** The validation command to run before copying the updated file into the final destination. */
  validate?: string;
}

export type LineinfileReturn = Record<string, unknown>;
export const lineinfile = defineRemoteModule<LineinfileArgs, LineinfileReturn>(spec, meta);
