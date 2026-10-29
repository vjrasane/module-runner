import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.systemd
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.systemd",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.systemd" } as const;
export interface SystemdArgs {
  /** Run daemon_reexec command before doing any other operations, the systemd manager will serialize the manager state. */
  daemon_reexec?: boolean;
  /** Run C(daemon-reload) before doing any other operations, to make sure systemd has read any changes. */
  daemon_reload?: boolean;
  /** Whether the unit should start on boot. At least one of O(state) or O(enabled) are required. */
  enabled?: boolean;
  /** Whether to override existing symlinks. */
  force?: boolean;
  /** Whether the unit should be masked or not. A masked unit is impossible to start. */
  masked?: boolean;
  /** Name of the unit. This parameter takes the name of exactly one unit to work with. */
  name?: string;
  /** Do not synchronously wait for the requested operation to finish. Enqueued job will continue without Ansible blocking on its completion. */
  no_block?: boolean;
  /** Run C(systemctl) within a given service manager scope, either as the default system scope V(system), the current user's scope V(user), or the scope of all users V(global). */
  scope?: "system" | "user" | "global";
  /** V(started)/V(stopped) are idempotent actions that will not run commands unless necessary. V(restarted) will always bounce the unit. V(reloaded) will always reload and if the service is not running at the moment of the reload, it is started. */
  state?: "reloaded" | "restarted" | "started" | "stopped";
}

export interface SystemdReturn {
  /** A dictionary with the key=value pairs returned from C(systemctl show). */
  status?: Record<string, unknown>;
}
export const systemd = defineRemoteModule<SystemdArgs, SystemdReturn>(spec, meta);
