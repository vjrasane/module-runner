import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.blockinfile
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.blockinfile",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.blockinfile" } as const;
export interface BlockinfileArgs {
  /** Append a blank line to the inserted block, if this does not appear at the end of the file. */
  append_newline?: boolean;
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Create a backup file including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly. */
  backup?: boolean;
  /** The text to insert inside the marker lines. */
  block?: string;
  /** Create a new file if it does not exist. */
  create?: boolean;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** If specified and no begin/ending O(marker) lines are found, the block will be inserted after the last match of specified regular expression. */
  insertafter?: string;
  /** If specified and no begin/ending O(marker) lines are found, the block will be inserted before the last match of specified regular expression. */
  insertbefore?: string;
  /** The marker line template. */
  marker?: string;
  /** This will be inserted at C({mark}) in the opening ansible block O(marker). */
  marker_begin?: string;
  /** This will be inserted at C({mark}) in the closing ansible block O(marker). */
  marker_end?: string;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** The file to modify. */
  path: string;
  /** Prepend a blank line to the inserted block, if this does not appear at the beginning of the file. */
  prepend_newline?: boolean;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** Whether the block should be there or not. */
  state?: "absent" | "present";
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** The validation command to run before copying the updated file into the final destination. */
  validate?: string;
}

export type BlockinfileReturn = Record<string, unknown>;
export const blockinfile = defineRemoteModule<BlockinfileArgs, BlockinfileReturn>(spec, meta);
