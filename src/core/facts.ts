// The facts ansible's `setup` module returns. Ansible emits hundreds, platform- and
// subset-dependent, so this types the commonly-used core precisely and leaves the rest
// as `unknown` (via the index signature) — never `any`: an unlisted fact must be
// narrowed before use rather than silently losing its type. Add fields here as needed.

export interface HostFacts {
  // user / identity
  ansible_user_id: string;
  ansible_user_dir: string;
  ansible_user_shell: string;
  ansible_user_uid: number;
  ansible_user_gid: number;
  ansible_real_user_id: number;
  ansible_effective_user_id: number;

  // host / platform
  ansible_hostname: string;
  ansible_nodename: string;
  ansible_fqdn: string;
  ansible_domain: string;
  ansible_system: string; // Linux, Darwin, …
  ansible_kernel: string;
  ansible_kernel_version: string;
  ansible_machine: string; // x86_64, aarch64
  ansible_architecture: string;
  ansible_userspace_bits: string; // "64"

  // distribution
  ansible_distribution: string; // Ubuntu, Debian, …
  ansible_distribution_version: string;
  ansible_distribution_major_version: string;
  ansible_distribution_release: string;
  ansible_os_family: string; // Debian, RedHat, …

  // managers
  ansible_pkg_mgr: string; // apt, dnf, apk, …
  ansible_service_mgr: string; // systemd, sysvinit, …

  // python (used for interpreter discovery)
  ansible_python_version: string;
  ansible_python?: {
    executable: string;
    version: { major: number; minor: number; micro: number };
    [key: string]: unknown;
  };

  // environment
  ansible_env: Record<string, string>;

  // the long tail — present but untyped; narrow before use
  [key: string]: unknown;
}
