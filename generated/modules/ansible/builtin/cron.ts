import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.cron
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.cron",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.cron" } as const;
export interface CronArgs {
  /** If set, create a backup of the crontab before it is modified. The location of the backup is returned in the RV(ignore:backup_file) variable by this module. */
  backup?: boolean;
  /** If specified, uses this file instead of an individual user's crontab. The assumption is that this file is exclusively managed by the module, do not use if the file contains multiple entries, NEVER use for /etc/crontab. */
  cron_file?: string;
  /** Day of the month the job should run (V(1-31), V(*), V(* /2), and so on). */
  day?: string;
  /** If the job should be disabled (commented out) in the crontab. */
  disabled?: boolean;
  /** If set, manages a crontab's environment variable. */
  env?: boolean;
  /** Hour when the job should run (V(0-23), V(*), V(* /2), and so on). */
  hour?: string;
  /** Used with O(state=present) and O(env). */
  insertafter?: string;
  /** Used with O(state=present) and O(env). */
  insertbefore?: string;
  /** The command to execute or, if O(env) is set, the value of environment variable. */
  job?: string;
  /** Minute when the job should run (V(0-59), V(*), V(* /2), and so on). */
  minute?: string;
  /** Month of the year the job should run (V(JAN-DEC) or V(1-12), V(*), V(* /2), and so on). */
  month?: string;
  /** Description of a crontab entry or, if O(env) is set, the name of environment variable. */
  name: string;
  /** Special time specification nickname. */
  special_time?: "annually" | "daily" | "hourly" | "monthly" | "reboot" | "weekly" | "yearly";
  /** Whether to ensure the job or environment variable is present or absent. */
  state?: "absent" | "present";
  /** The specific user whose crontab should be modified. */
  user?: string;
  /** Day of the week that the job should run (V(SUN-SAT) or V(0-6), V(*), and so on). */
  weekday?: string;
}

export type CronReturn = Record<string, unknown>;
export const cron = defineRemoteModule<CronArgs, CronReturn>(spec, meta);
