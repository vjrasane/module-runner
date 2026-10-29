import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.group
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.group",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.group" } as const;
export interface GroupArgs {
  /** Whether to delete a group even if it is the primary group of a user. */
  force?: boolean;
  /** Optional I(GID) to set for the group. */
  gid?: number;
  /** Sets the GID_MAX value for group creation. */
  gid_max?: number;
  /** Sets the GID_MIN value for group creation. */
  gid_min?: number;
  /** Forces the use of "local" command alternatives on platforms that implement it. */
  local?: boolean;
  /** Name of the group to manage. */
  name: string;
  /** This option allows to change the group ID to a non-unique value. Requires O(gid). */
  non_unique?: boolean;
  /** Whether the group should be present or not on the remote host. */
  state?: "absent" | "present";
  /** If V(yes), indicates that the group created is a system group. */
  system?: boolean;
}

export interface GroupReturn {
  /** Group ID of the group. */
  gid?: number;
  /** Group name. */
  name?: string;
  /** Whether the group is present or not. */
  state?: string;
  /** Whether the group is a system group or not. */
  system?: boolean;
}
export const group = defineRemoteModule<GroupArgs, GroupReturn>(spec, meta);
