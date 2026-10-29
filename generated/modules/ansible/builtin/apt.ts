import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.apt
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.apt",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.apt" } as const;
export interface AptArgs {
  /** Allows changing the version of a package which is on the apt hold list. */
  allow_change_held_packages?: boolean;
  /** Corresponds to the C(--allow-downgrades) option for I(apt). */
  allow_downgrade?: boolean;
  /** Ignore if packages cannot be authenticated. This is useful for bootstrapping environments that manage their own apt-key setup. */
  allow_unauthenticated?: boolean;
  /** Automatically install dependencies required to run this module. */
  auto_install_module_deps?: boolean;
  /** If V(true), cleans the local repository of retrieved package files that can no longer be downloaded. */
  autoclean?: boolean;
  /** If V(true), remove unused dependency packages for all module states except V(build-dep). It can also be used as the only option. */
  autoremove?: boolean;
  /** Update the apt cache if it is older than the O(cache_valid_time). This option is set in seconds. */
  cache_valid_time?: number;
  /** Run the equivalent of C(apt-get clean) to clear out the local repository of retrieved package files. It removes everything but the lock file from C(/var/cache/apt/archives/) and C(/var/cache/apt/archives/partial/). */
  clean?: boolean;
  /** Path to a .deb package on the remote machine. */
  deb?: string;
  /** Corresponds to the C(-t) option for I(apt) and sets pin priorities. */
  default_release?: string;
  /** Add C(dpkg) options to C(apt) command. Defaults to C(-o "Dpkg::Options::=--force-confdef" -o "Dpkg::Options::=--force-confold"). */
  dpkg_options?: string;
  /** Corresponds to the C(--no-remove) option for C(apt). */
  fail_on_autoremove?: boolean;
  /** Corresponds to the C(--force-yes) to C(apt-get) and implies O(allow_unauthenticated=yes) and O(allow_downgrade=yes). */
  force?: boolean;
  /** Force usage of apt-get instead of aptitude. */
  force_apt_get?: boolean;
  /** Corresponds to the C(--no-install-recommends) option for C(apt). V(true) installs recommended packages. V(false) does not install recommended packages. By default, Ansible will use the same defaults as the operating system. Suggested packages are never installed. */
  install_recommends?: boolean;
  /** How many seconds will this action wait to acquire a lock on the apt db. */
  lock_timeout?: number;
  /** A list of package names, like V(foo), or package specifier with version, like V(foo=1.0) or V(foo>=1.0). Name wildcards (fnmatch) like V(apt*) and version wildcards like V(foo=1.0*) are also supported. */
  name?: string | string[];
  /** Only upgrade a package if it is already installed. */
  only_upgrade?: boolean;
  /** Force the exit code of C(/usr/sbin/policy-rc.d). */
  policy_rc_d?: number;
  /** Will force purging of configuration files if O(state=absent) or O(autoremove=yes). */
  purge?: boolean;
  /** Indicates the desired package state. V(latest) ensures that the latest version is installed. V(build-dep) ensures the package build dependencies are installed. V(fixed) attempt to correct a system with broken dependencies in place. */
  state?: "absent" | "build-dep" | "latest" | "present" | "fixed";
  /** Run the equivalent of C(apt-get update) before the operation. Can be run as part of the package installation or as a separate step. */
  update_cache?: boolean;
  /** Amount of retries if the cache update fails. Also see O(update_cache_retry_max_delay). */
  update_cache_retries?: number;
  /** Use an exponential backoff delay for each retry (see O(update_cache_retries)) up to this max delay in seconds. */
  update_cache_retry_max_delay?: number;
  /** If yes or safe, performs an aptitude safe-upgrade. */
  upgrade?: "dist" | "full" | "no" | "safe" | "yes";
}

export interface AptReturn {
  /** time of the last cache update (0 if unknown) */
  cache_update_time?: number;
  /** if the cache was updated or not */
  cache_updated?: boolean;
  /** error output from apt */
  stderr?: string;
  /** output from apt */
  stdout?: string;
}
export const apt = defineRemoteModule<AptArgs, AptReturn>(spec, meta);
