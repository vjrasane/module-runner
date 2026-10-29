import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.service
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.service",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": false,
  "checkMode": "N/A",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.service" } as const;
export interface ServiceArgs {
  /** Additional arguments provided on the command line. */
  arguments?: string;
  /** Whether the service should start on boot. */
  enabled?: boolean;
  /** Name of the service. */
  name: string;
  /** If the service does not respond to the status command, name a substring to look for as would be found in the output of the C(ps) command as a stand-in for a status result. */
  pattern?: string;
  /** For OpenRC init scripts (e.g. Gentoo) only. */
  runlevel?: string;
  /** If the service is being V(restarted) then sleep this many seconds between the stop and start command. */
  sleep?: number;
  /** V(started)/V(stopped) are idempotent actions that will not run commands unless necessary. */
  state?: "reloaded" | "restarted" | "started" | "stopped";
  /** The service module actually uses system specific modules, normally through auto detection, this setting can force a specific module. */
  use?: string;
}

export type ServiceReturn = Record<string, unknown>;
export const service = defineRemoteModule<ServiceArgs, ServiceReturn>(spec, meta);
