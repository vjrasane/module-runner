import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.git
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.git",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.git" } as const;
export interface GitArgs {
  /** Will ensure or not that C(-o StrictHostKeyChecking=no) is present as an ssh option. */
  accept_hostkey?: boolean;
  /** As of OpenSSH 7.5, C(-o StrictHostKeyChecking=accept-new) can be used which is safer and will only accepts host keys which are not present or are the same. If V(true), ensure that C(-o StrictHostKeyChecking=accept-new) is present as an ssh option. */
  accept_newhostkey?: boolean;
  /** Specify archive file path with extension. If specified, creates an archive file of the specified format containing the tree structure for the source tree. Allowed archive formats ["zip", "tar.gz", "tar", "tgz"]. */
  archive?: string;
  /** Specify a prefix to add to each file path in archive. Requires O(archive) to be specified. */
  archive_prefix?: string;
  /** If V(true), repository will be created as a bare repo, otherwise it will be a standard repo with a workspace. */
  bare?: boolean;
  /** If V(false), do not clone the repository even if it does not exist locally. */
  clone?: boolean;
  /** Create a shallow clone with a history truncated to the specified number or revisions. The minimum possible value is V(1), otherwise ignored. Needs I(git>=1.9.1) to work correctly. */
  depth?: number;
  /** The path of where the repository should be checked out. This is equivalent to C(git clone [repo_url] [directory]). The repository named in O(repo) is not appended to this path and the destination directory must be empty. This parameter is required, unless O(clone) is set to V(false). */
  dest: string;
  /** Path to git executable to use. If not supplied, the normal mechanism for resolving binary paths will be used. */
  executable?: string;
  /** If V(true), any modified files in the working repository will be discarded.  Prior to 0.7, this was always V(true) and could not be disabled.  Prior to 1.9, the default was V(true). */
  force?: boolean;
  /** A list of trusted GPG fingerprints to compare to the fingerprint of the GPG-signed commit. */
  gpg_allowlist?: string | string[];
  /** Specify an optional private key file path, on the target host, to use for the checkout. */
  key_file?: string;
  /** If V(false), repository will be cloned without the C(--recursive) option, skipping sub-modules. */
  recursive?: boolean;
  /** Reference repository (see C(git clone --reference ...)). */
  reference?: string;
  /** Add an additional refspec to be fetched. If version is set to a I(SHA-1) not reachable from any branch or tag, this option may be necessary to specify the ref containing the I(SHA-1). Uses the same syntax as the C(git fetch) command. An example value could be "refs/meta/config". */
  refspec?: string;
  /** Name of the remote. */
  remote?: string;
  /** git, SSH, or HTTP(S) protocol address of the git repository. */
  repo: string;
  /** The path to place the cloned repository. If specified, Git repository can be separated from working tree. */
  separate_git_dir?: string;
  /** Clone only the history leading to the tip of the specified revision. */
  single_branch?: boolean;
  /** Options git will pass to ssh when used as protocol, it works via C(git)'s E(GIT_SSH)/E(GIT_SSH_COMMAND) environment variables. */
  ssh_opts?: string;
  /** If V(true), submodules will track the latest commit on their master branch (or other branch specified in C(.gitmodules)).  If V(false), submodules will be kept at the revision specified by the main project. This is equivalent to specifying the C(--remote) flag to git submodule update. */
  track_submodules?: boolean;
  /** The umask to set before doing any checkouts, or any other repository maintenance. */
  umask?: unknown;
  /** If V(false), do not retrieve new revisions from the origin repository. */
  update?: boolean;
  /** If V(true), when cloning or checking out a O(version) verify the signature of a GPG signed commit. This requires git version>=2.1.0 to be installed. The commit MUST be signed and the public key MUST be present in the GPG keyring. */
  verify_commit?: boolean;
  /** What version of the repository to check out. This can be the literal string V(HEAD), a branch name, a tag name. It can also be a I(SHA-1) hash, in which case O(refspec) needs to be specified if the given revision is not already available. */
  version?: string;
}

export interface GitReturn {
  /** Last commit revision of the repository retrieved during the update. */
  after?: string;
  /** Commit revision before the repository was updated, "null" for new repository. */
  before?: string;
  /** Contains the original path of .git directory if it is changed. */
  git_dir_before?: string;
  /** Contains the new path of .git directory if it is changed. */
  git_dir_now?: string;
  /** Contains True or False whether or not the remote URL was changed. */
  remote_url_changed?: boolean;
}
export const git = defineRemoteModule<GitArgs, GitReturn>(spec, meta);
