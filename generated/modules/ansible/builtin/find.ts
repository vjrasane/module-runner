import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.find
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.find",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.find" } as const;
export interface FindArgs {
  /** Select files whose age is equal to or greater than the specified time. */
  age?: string;
  /** Choose the file property against which we compare age. */
  age_stamp?: "atime" | "ctime" | "mtime";
  /** Algorithm to determine checksum of file. */
  checksum_algorithm?: "md5" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512";
  /** A regular expression or pattern which should be matched against the file content. */
  contains?: string;
  /** Set the maximum number of levels to descend into. */
  depth?: number;
  /** When doing a O(contains) search, determine the encoding of the files to be searched. */
  encoding?: string;
  /** Restrict mode matching to exact matches only, and not as a minimum set of permissions to match. */
  exact_mode?: boolean;
  /** One or more (shell or regex) patterns, which type is controlled by O(use_regex) option. */
  excludes?: string | string[];
  /** Type of file to select. */
  file_type?: "any" | "directory" | "file" | "link";
  /** Set this to V(true) to follow symlinks in path for systems with python 2.6+. */
  follow?: boolean;
  /** Whether to return a checksum of the file. */
  get_checksum?: boolean;
  /** Set this to V(true) to include hidden files, otherwise they will be ignored. */
  hidden?: boolean;
  /** Limit the maximum number of matching paths returned. After finding this many, the find action will stop looking. */
  limit?: number;
  /** Choose objects matching a specified permission. This value is restricted to modes that can be applied using the python C(os.chmod) function. */
  mode?: unknown;
  /** List of paths of directories to search. All paths must be fully qualified. */
  paths: string | string[];
  /** One or more (shell or regex) patterns, which type is controlled by O(use_regex) option. */
  patterns?: string | string[];
  /** When doing a C(contains) search, determines whether the whole file should be read into memory or if the regex should be applied to the file line-by-line. */
  read_whole_file?: boolean;
  /** If target is a directory, recursively descend into the directory looking for files. */
  recurse?: boolean;
  /** Select files whose size is equal to or greater than the specified size. */
  size?: string;
  /** If V(false), the patterns are file globs (shell). */
  use_regex?: boolean;
}

export interface FindReturn {
  /** Number of filesystem objects looked at */
  examined?: number;
  /** All matches found with the specified criteria (see stat module for full output of each dictionary) */
  files?: string | string[];
  /** Number of matches */
  matched?: number;
  /** skipped paths and reasons they were skipped */
  skipped_paths?: Record<string, unknown>;
}
export const find = defineRemoteModule<FindArgs, FindReturn>(spec, meta);
