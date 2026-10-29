import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.yum_repository
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.yum_repository",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.yum_repository" } as const;
export interface YumRepositoryArgs {
  /** If set to V(true) Yum will download packages and metadata from this repo in parallel, if possible. */
  async?: boolean;
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Maximum available network bandwidth in bytes/second. Used with the O(throttle) option. */
  bandwidth?: string;
  /** URL to the directory where the yum repository's 'repodata' directory lives. */
  baseurl?: string | string[];
  /** Relative cost of accessing this repository. Useful for weighing one repo's packages as greater/less than any other. */
  cost?: string;
  /** Whether a special flag should be added to a randomly chosen metalink/mirrorlist query each week. This allows the repository owner to estimate the number of systems consuming it. */
  countme?: boolean;
  /** When the relative size of deltarpm metadata vs pkgs is larger than this, deltarpm metadata is not downloaded from the repo. Note that you can give values over V(100), so V(200) means that the metadata is required to be half the size of the packages. Use V(0) to turn off this check, and always download metadata. */
  deltarpm_metadata_percentage?: string;
  /** When the relative size of delta vs pkg is larger than this, delta is not used. Use V(0) to turn off delta rpm processing. Local repositories (with file://O(baseurl)) have delta rpms turned off by default. */
  deltarpm_percentage?: string;
  /** A human-readable string describing the repository. This option corresponds to the C(name) property in the repo file. */
  description?: string;
  /** This tells yum whether or not use this repository. */
  enabled?: boolean;
  /** Determines whether yum will allow the use of package groups for this repository. */
  enablegroups?: boolean;
  /** List of packages to exclude from updates or installs. This should be a space separated list. Shell globs using wildcards (for example V(*) and V(?)) are allowed. */
  exclude?: string | string[];
  /** V(roundrobin) randomly selects a URL out of the list of URLs to start with and proceeds through each of them as it encounters a failure contacting the host. */
  failovermethod?: "roundrobin" | "priority";
  /** File name without the C(.repo) extension to save the repo in. Defaults to the value of O(name). */
  file?: string;
  /** A URL pointing to the ASCII-armored CA key file for the repository. */
  gpgcakey?: string;
  /** Tells yum whether or not it should perform a GPG signature check on packages. */
  gpgcheck?: boolean;
  /** A URL pointing to the ASCII-armored GPG key file for the repository. */
  gpgkey?: string | string[];
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** Determines how upstream HTTP caches are instructed to handle any HTTP downloads that Yum does. */
  http_caching?: "all" | "packages" | "none";
  /** Include external configuration file. Both, local path and URL is supported. Configuration file will be inserted at the position of the C(include=) line. Included files may contain further include lines. Yum will abort with an error if an inclusion loop is detected. */
  include?: string;
  /** List of packages you want to only use from a repository. This should be a space separated list. Shell globs using wildcards (for example V(*) and V(?)) are allowed. Substitution variables (for example V($releasever)) are honored here. */
  includepkgs?: string | string[];
  /** Determines how yum resolves host names. */
  ip_resolve?: "4" | "6" | "IPv4" | "IPv6" | "whatever";
  /** This tells yum whether or not HTTP/1.1 keepalive should be used with this repository. This can improve transfer speeds by using one connection when downloading multiple files from a repository. */
  keepalive?: boolean;
  /** Either V(1) or V(0). Determines whether or not yum keeps the cache of headers and packages after successful installation. */
  keepcache?: "0" | "1";
  /** Time (in seconds) after which the metadata will expire. */
  metadata_expire?: string;
  /** Filter the O(metadata_expire) time, allowing a trade of speed for accuracy if a command doesn't require it. Each yum command can specify that it requires a certain level of timeliness quality from the remote repos. from "I'm about to install/upgrade, so this better be current" to "Anything that's available is good enough". */
  metadata_expire_filter?: "never" | "read-only:past" | "read-only:present" | "read-only:future";
  /** Specifies a URL to a metalink file for the repomd.xml, a list of mirrors for the entire repository are generated by converting the mirrors for the repomd.xml file to a O(baseurl). */
  metalink?: string;
  /** Specifies a URL to a file containing a list of baseurls. */
  mirrorlist?: string;
  /** Time (in seconds) after which the mirrorlist locally cached will expire. */
  mirrorlist_expire?: string;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Disable module RPM filtering and make all RPMs from the repository available. The default is V(null). */
  module_hotfixes?: boolean;
  /** Unique repository ID. This option builds the section name of the repository in the repo file. */
  name: string;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** Password to use with the username for basic authentication. */
  password?: string;
  /** Enforce ordered protection of repositories. The value is an integer from 1 to 99. */
  priority?: string;
  /** Protect packages from updates from other repositories. */
  protect?: boolean;
  /** URL to the proxy server that yum should use. Set to V(_none_) to disable the global proxy setting. */
  proxy?: string;
  /** Password for this proxy. */
  proxy_password?: string;
  /** Username to use for proxy. */
  proxy_username?: string;
  /** This tells yum whether or not it should perform a GPG signature check on the repodata from this repository. */
  repo_gpgcheck?: boolean;
  /** Directory where the C(.repo) files will be stored. */
  reposdir?: string;
  /** Set the number of times any attempt to retrieve a file should retry before returning an error. Setting this to V(0) makes yum try forever. */
  retries?: string;
  /** Enables support for S3 repositories. */
  s3_enabled?: boolean;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** If set to V(true) yum will continue running if this repository cannot be contacted for any reason. This should be set carefully as all repos are consulted for any given command. */
  skip_if_unavailable?: boolean;
  /** Whether yum should check the permissions on the paths for the certificates on the repository (both remote and local). */
  ssl_check_cert_permissions?: boolean;
  /** Path to the directory containing the databases of the certificate authorities yum should use to verify SSL certificates. */
  sslcacert?: string;
  /** Path to the SSL client certificate yum should use to connect to repos/remote sites. */
  sslclientcert?: string;
  /** Path to the SSL client key yum should use to connect to repos/remote sites. */
  sslclientkey?: string;
  /** Defines whether yum should verify SSL certificates/hosts at all. */
  sslverify?: boolean;
  /** State of the repo file. */
  state?: "absent" | "present";
  /** Enable bandwidth throttling for downloads. */
  throttle?: string;
  /** Number of seconds to wait for a connection before timing out. */
  timeout?: string;
  /** When a repository id is displayed, append these yum variables to the string if they are used in the O(baseurl)/etc. Variables are appended in the order listed (and found). */
  ui_repoid_vars?: string;
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** Username to use for basic authentication to a repo or really any url. */
  username?: string;
}

export interface YumRepositoryReturn {
  /** repository name */
  repo?: string;
  /** state of the target, after execution */
  state?: string;
}
export const yum_repository = defineRemoteModule<YumRepositoryArgs, YumRepositoryReturn>(spec, meta);
