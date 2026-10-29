import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.setup
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.setup",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.setup" } as const;
export interface SetupArgs {
  /** Path used for local ansible facts (C(*.fact)) - files in this dir will be run (if executable) and their results be added to C(ansible_local) facts. If a file is not executable it is read instead. File/results format can be JSON or INI-format. The default O(fact_path) can be specified in C(ansible.cfg) for when setup is automatically called as part of C(gather_facts). NOTE - For windows clients, the results will be added to a variable named after the local file (without extension suffix), rather than C(ansible_local). */
  fact_path?: string;
  /** If supplied, only return facts that match one of the shell-style (fnmatch) pattern. An empty list basically means 'no filter'. As of Ansible 2.11, the type has changed from string to list and the default has became an empty list. A simple string is still accepted and works as a single pattern. The behaviour prior to Ansible 2.11 remains. */
  filter?: string | string[];
  /** If supplied, restrict the additional facts collected to the given subset. Possible values: V(all), V(all_ipv4_addresses), V(all_ipv6_addresses), V(apparmor), V(architecture), V(caps), V(chroot),V(cmdline), V(date_time), V(default_ipv4), V(default_ipv6), V(devices), V(distribution), V(distribution_major_version), V(distribution_release), V(distribution_version), V(dns), V(effective_group_ids), V(effective_user_id), V(env), V(facter), V(fips), V(hardware), V(interfaces), V(is_chroot), V(iscsi), V(kernel), V(local), V(lsb), V(machine), V(machine_id), V(mounts), V(network), V(ohai), V(os_family), V(pkg_mgr), V(platform), V(processor), V(processor_cores), V(processor_count), V(python), V(python_version), V(real_user_id), V(selinux), V(service_mgr), V(ssh_host_key_dsa_public), V(ssh_host_key_ecdsa_public), V(ssh_host_key_ed25519_public), V(ssh_host_key_rsa_public), V(ssh_host_pub_keys), V(ssh_pub_keys), V(system), V(system_capabilities), V(system_capabilities_enforced), V(systemd), V(user), V(user_dir), V(user_gecos), V(user_gid), V(user_id), V(user_shell), V(user_uid), V(virtual), V(virtualization_role), V(virtualization_type). Can specify a list of values to specify a larger subset. Values can also be used with an initial C(!) to specify that that specific subset should not be collected.  For instance: V(!hardware,!network,!virtual,!ohai,!facter). If V(!all) is specified then only the min subset is collected. To avoid collecting even the min subset, specify V(!all,!min). To collect only specific facts, use V(!all,!min), and specify the particular fact subsets. Use the filter parameter if you do not want to display some collected facts. */
  gather_subset?: string | string[];
  /** Set the default timeout in seconds for individual fact gathering. */
  gather_timeout?: number;
}

export type SetupReturn = Record<string, unknown>;
export const setup = defineRemoteModule<SetupArgs, SetupReturn>(spec, meta);
