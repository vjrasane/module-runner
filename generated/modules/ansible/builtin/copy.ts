import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.copy
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.copy",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.copy" } as const;
export interface CopyArgs {
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Create a backup file including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly. */
  backup?: boolean;
  /** SHA1 checksum of the file being transferred. */
  checksum?: string;
  /** When used instead of O(src), sets the contents of a file directly to the specified value. */
  content?: string;
  /** This option controls the auto-decryption of source files using vault. */
  decrypt?: boolean;
  /** Remote absolute path where the file should be copied to. */
  dest: string;
  /** Set the access permissions of newly created directories to the given mode. Permissions on existing directories do not change. */
  directory_mode?: unknown;
  /** This flag indicates that filesystem links in the destination, if they exist, should be followed. */
  follow?: boolean;
  /** Influence whether the remote file must always be replaced. */
  force?: boolean;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** This flag indicates that filesystem links in the source tree, if they exist, should be followed. */
  local_follow?: boolean;
  /** The permissions of the destination file or directory. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** Influence whether O(src) needs to be transferred or already is present remotely. */
  remote_src?: boolean;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** Local path to a file to copy to the remote server. */
  src?: string;
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** The validation command to run before copying the updated file into the final destination. */
  validate?: string;
}

export interface CopyReturn {
  /** Name of backup file created. */
  backup_file?: string;
  /** SHA1 checksum of the file after running copy. */
  checksum?: string;
  /** Destination file/path. */
  dest?: string;
  /** Group id of the file, after execution. */
  gid?: number;
  /** Group of the file, after execution. */
  group?: string;
  /** MD5 checksum of the file after running copy. */
  md5sum?: string;
  /** Permissions of the target, after execution. */
  mode?: string;
  /** Owner of the file, after execution. */
  owner?: string;
  /** Size of the target, after execution. */
  size?: number;
  /** Source file used for the copy on the target machine. */
  src?: string;
  /** State of the target, after execution. */
  state?: string;
  /** Owner id of the file, after execution. */
  uid?: number;
}
export const copy = defineRemoteModule<CopyArgs, CopyReturn>(spec, meta);
