import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.command
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.command",
  "actionPlugin": true,
  "powershell": false,
  "rawParams": true,
  "checkMode": "partial",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.command" } as const;
export interface CommandArgs {
  /** Passes the command as a list rather than a string. */
  argv?: string | string[];
  /** Change into this directory before running the command. */
  chdir?: string;
  /** The command to run. */
  cmd?: string;
  /** A filename or (since 2.0) glob pattern. If a matching file already exists, this step B(will not) be run. */
  creates?: string;
  /** Expands the arguments that are variables, for example C($HOME) will be expanded before being passed to the command to run. */
  expand_argument_vars?: boolean;
  /** The command module takes a free form string as a command to run. */
  free_form?: string;
  /** A filename or (since 2.0) glob pattern. If a matching file exists, this step B(will) be run. */
  removes?: string;
  /** Set the stdin of the command directly to the specified value. */
  stdin?: string;
  /** If set to V(true), append a newline to stdin data. */
  stdin_add_newline?: boolean;
  /** Strip empty lines from the end of stdout/stderr in result. */
  strip_empty_ends?: boolean;
}

export interface CommandReturn {
  /** The command executed by the task. */
  cmd?: string | string[];
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
export const command = defineRemoteModule<CommandArgs, CommandReturn>(spec, meta);
