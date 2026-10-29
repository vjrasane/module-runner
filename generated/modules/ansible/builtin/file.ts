import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.file
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.file",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.file" } as const;
export interface FileArgs {
  /** This parameter indicates the time the file's access time should be set to. */
  access_time?: string;
  /** When used with O(access_time), indicates the time format that must be used. */
  access_time_format?: string;
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** This flag indicates that filesystem links, if they exist, should be followed. */
  follow?: boolean;
  /** Force the creation of the links in two cases: if the link type is symbolic and the source file does not exist (but will appear later); the destination exists and is a file (so, we need to unlink the O(path) file and create a link to the O(src) file in place of it).
   */
  force?: boolean;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** This parameter indicates the time the file's modification time should be set to. */
  modification_time?: string;
  /** When used with O(modification_time), indicates the time format that must be used. */
  modification_time_format?: string;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** Path to the file being managed. */
  path: string;
  /** Recursively set the specified file attributes on directory contents. */
  recurse?: boolean;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** Path of the file to link to. */
  src?: string;
  /** If V(absent), directories will be recursively deleted, and files or symlinks will be unlinked. In the case of a directory, if C(diff) is declared, you will see the files and folders deleted listed under C(path_contents). Note that V(absent) will not cause M(ansible.builtin.file) to fail if the O(path) does not exist as the state did not change. */
  state?: "absent" | "directory" | "file" | "hard" | "link" | "touch";
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
}

export interface FileReturn {
  /** Destination file/path, equal to the value passed to O(path). */
  dest?: string;
  /** Destination file/path, equal to the value passed to O(path). */
  path?: string;
}
export const file = defineRemoteModule<FileArgs, FileReturn>(spec, meta);
