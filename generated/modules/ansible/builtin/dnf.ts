import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.dnf
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.dnf",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.dnf" } as const;
export interface DnfArgs {
  /** Specify if the named package and version is allowed to downgrade a maybe already installed higher version of that package. Note that setting O(allow_downgrade=true) can make this module behave in a non-idempotent way. The task could end up with a set of packages that does not match the complete list of specified packages to install (because dependencies between the downgraded package and others can cause changes to the packages which were in the earlier transaction). */
  allow_downgrade?: boolean;
  /** If V(true) it allows erasing of installed packages to resolve dependencies. */
  allowerasing?: boolean;
  /** If V(true), removes all "leaf" packages from the system that were originally installed as dependencies of user-installed packages but which are no longer required by any such package. Should be used alone or when O(state=absent). */
  autoremove?: boolean;
  /** When set to V(true), either use a package with the highest version available or fail. */
  best?: boolean;
  /** If set to V(true), and O(state=latest) then only installs updates that have been marked bugfix related. */
  bugfix?: boolean;
  /** Tells dnf to run entirely from system cache; does not download or update metadata. */
  cacheonly?: boolean;
  /** The remote dnf configuration file to use for the transaction. */
  conf_file?: string;
  /** Disable the excludes defined in DNF config files. */
  disable_excludes?: string;
  /** Whether to disable the GPG checking of signatures of packages being installed. Has an effect only if O(state=present) or O(state=latest). */
  disable_gpg_check?: boolean;
  /** C(Plugin) name to disable for the install/update operation. The disabled plugins will not persist beyond the transaction. */
  disable_plugin?: string | string[];
  /** C(Repoid) of repositories to disable for the install/update operation. These repos will not persist beyond the transaction. When specifying multiple repos, separate them with a C(,). */
  disablerepo?: string | string[];
  /** Specifies an alternate directory to store packages. */
  download_dir?: string;
  /** Only download the packages, do not install them. */
  download_only?: boolean;
  /** C(Plugin) name to enable for the install/update operation. The enabled plugin will not persist beyond the transaction. */
  enable_plugin?: string | string[];
  /** C(Repoid) of repositories to enable for the install/update operation. These repos will not persist beyond the transaction. When specifying multiple repos, separate them with a ",". */
  enablerepo?: string | string[];
  /** Package name(s) to exclude when O(state=present), or latest. This can be a list or a comma separated string. */
  exclude?: string | string[];
  /** This is effectively a no-op in DNF as it is not needed with DNF. */
  install_repoquery?: boolean;
  /** Will also install all packages linked by a weak dependency relation. */
  install_weak_deps?: boolean;
  /** Specifies an alternative installroot, relative to which all packages will be installed. */
  installroot?: string;
  /** Various (non-idempotent) commands for usage with C(/usr/bin/ansible) and I(not) playbooks. Use M(ansible.builtin.package_facts) instead of the O(list) argument as a best practice. */
  list?: string;
  /** Amount of time to wait for the dnf lockfile to be freed. */
  lock_timeout?: number;
  /** A package name or package specifier with version, like C(name-1.0). When using state=latest, this can be '*' which means run: dnf -y update. You can also pass a url or a local path to an rpm file. To operate on several packages this can accept a comma separated string of packages or a list of packages. */
  name?: string | string[];
  /** This is the opposite of the O(best) option kept for backwards compatibility. */
  nobest?: boolean;
  /** Specifies an alternative release from which all packages will be installed. */
  releasever?: string;
  /** If set to V(true), and O(state=latest) then only installs updates that have been marked security related. */
  security?: boolean;
  /** Skip all unavailable packages or packages with broken dependencies without raising an error. Equivalent to passing the C(--skip-broken) option. */
  skip_broken?: boolean;
  /** Disables SSL validation of the repository server for this transaction. */
  sslverify?: boolean;
  /** Whether to install (V(present), V(latest)), or remove (V(absent)) a package. */
  state?: "absent" | "present" | "installed" | "removed" | "latest";
  /** Force dnf to check if cache is out of date and redownload if needed. Has an effect only if O(state=present) or O(state=latest). */
  update_cache?: boolean;
  /** When using latest, only update installed packages. Do not install packages. */
  update_only?: boolean;
  /** Backend module to use. */
  use_backend?: string;
  /** This only applies if using a https url as the source of the rpm. For example, for localinstall. If set to V(false), the SSL certificates will not be validated. */
  validate_certs?: boolean;
}

export type DnfReturn = Record<string, unknown>;
export const dnf = defineRemoteModule<DnfArgs, DnfReturn>(spec, meta);
