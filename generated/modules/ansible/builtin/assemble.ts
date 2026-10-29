import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.assemble
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.assemble",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.assemble" } as const;
export interface AssembleArgs {
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Create a backup file (if V(true)), including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly. */
  backup?: boolean;
  /** This option controls the auto-decryption of source files using vault. */
  decrypt?: boolean;
  /** A delimiter to separate the file contents. */
  delimiter?: string;
  /** A file to create using the concatenation of all of the source files. */
  dest: string;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** A boolean that controls if files that start with a C(.) will be included or not. */
  ignore_hidden?: boolean;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** Assemble files only if the given regular expression matches the filename. */
  regexp?: string;
  /** If V(false), it will search for src at originating/master machine. */
  remote_src?: boolean;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** An already existing directory full of source files. */
  src: string;
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** The validation command to run before copying into place. */
  validate?: string;
}

export type AssembleReturn = Record<string, unknown>;
export const assemble = defineRemoteModule<AssembleArgs, AssembleReturn>(spec, meta);
