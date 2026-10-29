import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.shell
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.shell",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": true,
  "checkMode": "partial",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.shell" } as const;
export interface ShellArgs {
  /** Change into this directory before running the command. */
  chdir?: string;
  /** The command to run followed by optional arguments. */
  cmd?: string;
  /** A filename, when it already exists, this step will B(not) be run. */
  creates?: string;
  /** Change the shell used to execute the command. */
  executable?: string;
  /** The shell module takes a free form command to run, as a string. */
  free_form?: string;
  /** A filename, when it does not exist, this step will B(not) be run. */
  removes?: string;
  /** Set the stdin of the command directly to the specified value. */
  stdin?: string;
  /** Whether to append a newline to stdin data. */
  stdin_add_newline?: boolean;
}

export interface ShellReturn {
  /** The command executed by the task. */
  cmd?: string;
  /** The command execution delta time. */
  delta?: string;
  /** The command execution end time. */
  end?: string;
  /** changed */
  msg?: boolean;
  /** The command return code (0 means success). */
  rc?: number;
  /** The command execution start time. */
  start?: string;
  /** The command standard error. */
  stderr?: string;
  /** The command standard error split in lines. */
  stderr_lines?: string | string[];
  /** The command standard output. */
  stdout?: string;
  /** The command standard output split in lines. */
  stdout_lines?: string | string[];
}
export const shell = defineRemoteModule<ShellArgs, ShellReturn>(spec, meta);
