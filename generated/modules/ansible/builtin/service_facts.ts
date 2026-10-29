import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.service_facts
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.service_facts",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.service_facts" } as const;
export type ServiceFactsArgs = Record<string, unknown>;

export interface ServiceFactsReturn {
  /** Facts to add to ansible_facts about the services on the system */
  ansible_facts?: unknown;
}
export const service_facts = defineRemoteModule<ServiceFactsArgs, ServiceFactsReturn>(spec, meta);
