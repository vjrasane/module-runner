import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.mount_facts
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.mount_facts",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.mount_facts" } as const;
export interface MountFactsArgs {
  /** A list of fnmatch patterns to filter mounts by the special device or remote file system. */
  devices?: string | string[];
  /** A list of fnmatch patterns to filter mounts by the type of the file system. */
  fstypes?: string | string[];
  /** Whether or not the module should return the C(aggregate_mounts) list in C(ansible_facts). */
  include_aggregate_mounts?: boolean;
  /** The O(mount_binary) is used if O(sources) contain the value "mount", or if O(sources) contains a dynamic source, and none were found (as can be expected on BSD or AIX hosts). */
  mount_binary?: unknown;
  /** The action to take when gathering mount information exceeds O(timeout). */
  on_timeout?: "error" | "warn" | "ignore";
  /** A list of sources used to determine the mounts. Missing file sources (or empty files) are skipped. Repeat sources, including symlinks, are skipped. */
  sources?: string | string[];
  /** This is the maximum number of seconds to wait for each mount to complete. When this is V(null), wait indefinitely. */
  timeout?: number;
}

export interface MountFactsReturn {
  /** An ansible_facts dictionary containing a dictionary of C(mount_points) and list of C(aggregate_mounts) when enabled. */
  ansible_facts?: Record<string, unknown>;
}
export const mount_facts = defineRemoteModule<MountFactsArgs, MountFactsReturn>(spec, meta);
