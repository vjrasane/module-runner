import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.wait_for
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.wait_for",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "none",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.wait_for" } as const;
export interface WaitForArgs {
  /** The list of TCP connection states which are counted as active connections. */
  active_connection_states?: string | string[];
  /** Maximum number of seconds to wait for a connection to happen before closing and retrying. */
  connect_timeout?: number;
  /** Number of seconds to wait before starting to poll. */
  delay?: number;
  /** List of hosts or IPs to ignore when looking for active TCP connections for V(drained) state. */
  exclude_hosts?: string | string[];
  /** A resolvable hostname or IP address to wait for. */
  host?: string;
  /** This overrides the normal error message from a failure to meet the required conditions. */
  msg?: string;
  /** Path to a file on the filesystem that must exist before continuing. */
  path?: string;
  /** Port number to poll. */
  port?: number;
  /** Can be used to match a string in either a file or a socket connection. */
  search_regex?: string;
  /** Number of seconds to sleep between checks. */
  sleep?: number;
  /** Either V(present), V(started), or V(stopped), V(absent), or V(drained). */
  state?: "absent" | "drained" | "present" | "started" | "stopped";
  /** Maximum number of seconds to wait for, when used with another condition it will force an error. */
  timeout?: number;
}

export interface WaitForReturn {
  /** The number of seconds that elapsed while waiting */
  elapsed?: number;
  /** Dictionary containing all the named subgroups of the match, keyed by the subgroup name, as returned by U(https://docs.python.org/3/library/re.html#re.MatchObject.groupdict) */
  match_groupdict?: Record<string, unknown>;
  /** Tuple containing all the subgroups of the match as returned by U(https://docs.python.org/3/library/re.html#re.MatchObject.groups) */
  match_groups?: string | string[];
}
export const wait_for = defineRemoteModule<WaitForArgs, WaitForReturn>(spec, meta);
