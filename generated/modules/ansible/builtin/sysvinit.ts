import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.sysvinit
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.sysvinit",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.sysvinit" } as const;
export interface SysvinitArgs {
  /** Additional arguments provided on the command line that some init scripts accept. */
  arguments?: string;
  /** Have the module daemonize as the service itself might not do so properly. */
  daemonize?: boolean;
  /** Whether the service should start on boot. At least one of O(state) and O(enabled) are required. */
  enabled?: boolean;
  /** Name of the service. */
  name: string;
  /** A substring to look for as would be found in the output of the I(ps) command as a stand-in for a status result. */
  pattern?: string;
  /** The runlevels this script should be enabled/disabled from. */
  runlevels?: string | string[];
  /** If the service is being V(restarted) or V(reloaded) then sleep this many seconds between the stop and start command. This helps to workaround badly behaving services. */
  sleep?: number;
  /** V(started)/V(stopped) are idempotent actions that will not run commands unless necessary. Not all init scripts support V(restarted) nor V(reloaded) natively, so these will both trigger a stop and start as needed. */
  state?: "started" | "stopped" | "restarted" | "reloaded";
}

export interface SysvinitReturn {
  /** results from actions taken */
  results?: unknown;
}
export const sysvinit = defineRemoteModule<SysvinitArgs, SysvinitReturn>(spec, meta);
