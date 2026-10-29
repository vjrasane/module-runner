import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.unarchive
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.unarchive",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": false,
  "checkMode": "partial",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.unarchive" } as const;
export interface UnarchiveArgs {
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** If true, the file is copied from local controller to the managed (remote) node, otherwise, the plugin will look for src archive on the managed machine. */
  copy?: boolean;
  /** If the specified absolute path (file or directory) already exists, this step will B(not) be run. */
  creates?: string;
  /** This option controls the auto-decryption of source files using vault. */
  decrypt?: boolean;
  /** Remote absolute path where the archive should be unpacked. */
  dest: string;
  /** List the directory and file entries that you would like to exclude from the unarchive action. */
  exclude?: string | string[];
  /** Specify additional options by passing in an array. */
  extra_opts?: string | string[];
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** List of directory and file entries that you would like to extract from the archive. If O(include) is not empty, only files listed here will be extracted. */
  include?: string | string[];
  /** Size of the volatile memory buffer that is used for extracting files from the archive in bytes. */
  io_buffer_size?: number;
  /** Do not replace existing files that are newer than files from the archive. */
  keep_newer?: boolean;
  /** If set to True, return the list of files that are contained in the tarball. */
  list_files?: boolean;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** Set to V(true) to indicate the archived file is already on the remote system and not local to the Ansible controller. */
  remote_src?: boolean;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** If O(remote_src=no) (default), local path to archive file to copy to the target server; can be absolute or relative. If O(remote_src=yes), path on the target server to existing archive file to unpack. */
  src: string;
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** This only applies if using a https URL as the source of the file. */
  validate_certs?: boolean;
}

export interface UnarchiveReturn {
  /** Path to the destination directory. */
  dest?: string;
  /** List of all the files in the archive. */
  files?: string | string[];
  /** Numerical ID of the group that owns the destination directory. */
  gid?: number;
  /** Name of the group that owns the destination directory. */
  group?: string;
  /** Archive software handler used to extract and decompress the archive. */
  handler?: string;
  /** String that represents the octal permissions of the destination directory. */
  mode?: string;
  /** Name of the user that owns the destination directory. */
  owner?: string;
  /** The size of destination directory in bytes. Does not include the size of files or subdirectories contained within. */
  size?: number;
  /** The source archive's path. */
  src?: string;
  /** State of the destination. Effectively always "directory". */
  state?: string;
  /** Numerical ID of the user that owns the destination directory. */
  uid?: number;
}
export const unarchive = defineRemoteModule<UnarchiveArgs, UnarchiveReturn>(spec, meta);
