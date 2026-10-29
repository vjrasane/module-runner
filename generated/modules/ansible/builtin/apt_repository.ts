import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.apt_repository
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.apt_repository",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.apt_repository" } as const;
export interface AptRepositoryArgs {
  /** Override the distribution codename to use for PPA repositories. Should usually only be set when working with a PPA on a non-Ubuntu target (for example, Debian or Mint). */
  codename?: string;
  /** Sets the name of the source list file in C(sources.list.d). Defaults to a file name based on the repository source url. The C(.list) extension will be automatically added. */
  filename?: string;
  /** Whether to automatically try to install the Python apt library or not, if it is not already installed. Without this library, the module does not work. */
  install_python_apt?: boolean;
  /** The octal mode for newly created files in C(sources.list.d). */
  mode?: unknown;
  /** A source string for the repository. */
  repo: string;
  /** A source string state. */
  state?: "absent" | "present";
  /** Run the equivalent of C(apt-get update) when a change occurs. Cache updates are run after making changes. */
  update_cache?: boolean;
  /** Amount of retries if the cache update fails. Also see O(update_cache_retry_max_delay). */
  update_cache_retries?: number;
  /** Use an exponential backoff delay for each retry (see O(update_cache_retries)) up to this max delay in seconds. */
  update_cache_retry_max_delay?: number;
  /** If V(false), SSL certificates for the target repo will not be validated. This should only be used on personally controlled sites using self-signed certificates. */
  validate_certs?: boolean;
}

export interface AptRepositoryReturn {
  /** A source string for the repository */
  repo?: string;
  /** List of sources added */
  sources_added?: string | string[];
  /** List of sources removed */
  sources_removed?: string | string[];
}
export const apt_repository = defineRemoteModule<AptRepositoryArgs, AptRepositoryReturn>(spec, meta);
