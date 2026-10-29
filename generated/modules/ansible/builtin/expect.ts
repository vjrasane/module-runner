import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.expect
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.expect",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "none",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.expect" } as const;
export interface ExpectArgs {
  /** Change into this directory before running the command. */
  chdir?: string;
  /** The command module takes command to run. */
  command: string;
  /** A filename, when it already exists, this step will B(not) be run. */
  creates?: string;
  /** Whether or not to echo out your response strings. */
  echo?: boolean;
  /** A filename, when it does not exist, this step will B(not) be run. */
  removes?: string;
  /** Mapping of prompt regular expressions and corresponding answer(s). */
  responses: Record<string, unknown>;
  /** Amount of time in seconds to wait for the expected strings. Use V(null) to disable timeout. */
  timeout?: unknown;
}

export type ExpectReturn = Record<string, unknown>;
export const expect = defineRemoteModule<ExpectArgs, ExpectReturn>(spec, meta);
