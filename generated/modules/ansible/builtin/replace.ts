import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.replace
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.replace",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.replace" } as const;
export interface ReplaceArgs {
  /** If specified, only content after this match will be replaced/removed. */
  after?: string;
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Create a backup file including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly. */
  backup?: boolean;
  /** If specified, only content before this match will be replaced/removed. */
  before?: string;
  /** The character encoding for reading and writing the file. */
  encoding?: string;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** The file to modify. */
  path: string;
  /** The regular expression to look for in the contents of the file. */
  regexp: string;
  /** The string to replace regexp matches. */
  replace?: string;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** The validation command to run before copying the updated file into the final destination. */
  validate?: string;
}

export type ReplaceReturn = Record<string, unknown>;
export const replace = defineRemoteModule<ReplaceArgs, ReplaceReturn>(spec, meta);
