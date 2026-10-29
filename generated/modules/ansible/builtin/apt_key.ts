import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.apt_key
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.apt_key",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "full",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.apt_key" } as const;
export interface AptKeyArgs {
  /** The keyfile contents to add to the keyring. */
  data?: string;
  /** The path to a keyfile on the remote server to add to the keyring. */
  file?: string;
  /** The identifier of the key. */
  id?: string;
  /** The full path to specific keyring file in C(/etc/apt/trusted.gpg.d/). */
  keyring?: string;
  /** The keyserver to retrieve key from. */
  keyserver?: string;
  /** Ensures that the key is present (added) or absent (revoked). */
  state?: "absent" | "present";
  /** The URL to retrieve key from. */
  url?: string;
  /** If V(false), SSL certificates for the target url will not be validated. This should only be used on personally controlled sites using self-signed certificates. */
  validate_certs?: boolean;
}

export interface AptKeyReturn {
  /** List of apt key ids or fingerprints after any modification */
  after?: string | string[];
  /** List of apt key ids or fingprints before any modifications */
  before?: string | string[];
  /** Fingerprint of the key to import */
  fp?: string;
  /** key id from source */
  id?: string;
  /** calculated key id, it should be same as 'id', but can be different */
  key_id?: string;
  /** calculated short key id */
  short_id?: string;
}
export const apt_key = defineRemoteModule<AptKeyArgs, AptKeyReturn>(spec, meta);
