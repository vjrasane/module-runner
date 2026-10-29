import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.subversion
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.subversion",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.subversion" } as const;
export interface SubversionArgs {
  /** If V(false), do not check out the repository if it does not exist locally. */
  checkout?: boolean;
  /** Absolute path where the repository should be deployed. */
  dest?: string;
  /** Path to svn executable to use. If not supplied, the normal mechanism for resolving binary paths will be used. */
  executable?: string;
  /** If V(true), do export instead of checkout/update. */
  export?: boolean;
  /** If V(true), modified files will be discarded. If V(false), module will fail if it encounters modified files. Prior to 1.9 the default was V(true). */
  force?: boolean;
  /** If the directory exists, then the working copy will be checked-out over-the-top using C(svn checkout --force); if force is specified then existing files with different content are reverted. */
  in_place?: boolean;
  /** C(--password) parameter passed to svn when svn is less than version 1.10.0. This is not secure and the password will be leaked to argv. */
  password?: string;
  /** The subversion URL to the repository. */
  repo: string;
  /** Specific revision to checkout. */
  revision?: string;
  /** If V(false), do not call svn switch before update. */
  switch?: boolean;
  /** If V(false), do not retrieve new revisions from the origin repository. */
  update?: boolean;
  /** C(--username) parameter passed to svn. */
  username?: string;
  /** If V(false), passes the C(--trust-server-cert) flag to svn. */
  validate_certs?: boolean;
}

export type SubversionReturn = Record<string, unknown>;
export const subversion = defineRemoteModule<SubversionArgs, SubversionReturn>(spec, meta);
