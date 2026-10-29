import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.deb822_repository
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.deb822_repository",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "none",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.deb822_repository" } as const;
export interface Deb822RepositoryArgs {
  /** Allow downgrading a package that was previously authenticated but is no longer authenticated. */
  allow_downgrade_to_insecure?: boolean;
  /** Allow insecure repositories. */
  allow_insecure?: boolean;
  /** Allow repositories signed with a key using a weak digest algorithm. */
  allow_weak?: boolean;
  /** Architectures to search within repository. */
  architectures?: string | string[];
  /** Controls if APT should try to acquire indexes via a URI constructed from a hashsum of the expected file instead of using the well-known stable filename of the index. */
  by_hash?: boolean;
  /** Controls if APT should consider the machine's time correct and hence perform time related checks, such as verifying that a Release file is not from the future. */
  check_date?: boolean;
  /** Controls if APT should try to detect replay attacks. */
  check_valid_until?: boolean;
  /** Components specify different sections of one distribution version present in a C(Suite). */
  components?: string | string[];
  /** Controls how far from the future a repository may be. */
  date_max_future?: number;
  /** Tells APT whether the source is enabled or not. */
  enabled?: boolean;
  /** Determines the path to the C(InRelease) file, relative to the normal position of an C(InRelease) file. */
  inrelease_path?: string;
  /** Defines which languages information such as translated package descriptions should be downloaded. */
  languages?: string | string[];
  /** The octal mode for newly created files in C(sources.list.d). */
  mode?: unknown;
  /** Name of the repo. Specifically used for C(X-Repolib-Name) and in naming the repository and signing key files. */
  name: string;
  /** Controls if APT should try to use C(PDiffs) to update old indexes instead of downloading the new indexes entirely. */
  pdiffs?: boolean;
  /** Either a URL to a GPG key, absolute path to a keyring file, one or more fingerprints of keys either in the C(trusted.gpg) keyring or in the keyrings in the C(trusted.gpg.d/) directory, or an ASCII armored GPG public key block. */
  signed_by?: string;
  /** A source string state. */
  state?: "absent" | "present";
  /** Suite can specify an exact path in relation to the URI(s) provided, in which case the Components: must be omitted and suite must end with a slash (C(/)). Alternatively, it may take the form of a distribution version (for example a version codename like C(disco) or C(artful)). If the suite does not specify a path, at least one component must be present. */
  suites?: string | string[];
  /** Defines which download targets apt will try to acquire from this source. */
  targets?: string | string[];
  /** Decides if a source is considered trusted or if warnings should be raised before, for example packages are installed from this source. */
  trusted?: boolean;
  /** Which types of packages to look for from a given source; either binary V(deb) or source code V(deb-src). */
  types?: "deb" | "deb-src";
  /** The URIs must specify the base of the Debian distribution archive, from which APT finds the information it needs. */
  uris?: string | string[];
}

export interface Deb822RepositoryReturn {
  /** Path to the repository file */
  dest?: string;
  /** Path to the signed_by key file */
  key_filename?: string;
  /** A source string for the repository */
  repo?: string;
}
export const deb822_repository = defineRemoteModule<Deb822RepositoryArgs, Deb822RepositoryReturn>(spec, meta);
