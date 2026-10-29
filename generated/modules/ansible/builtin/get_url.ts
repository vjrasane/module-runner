import { type AnsibleModuleMeta, defineRemoteModule, type RemoteModuleSpec } from "module-runner";

// Auto-generated from: ansible.builtin.get_url
// DO NOT EDIT — regenerate with codegen
const meta: AnsibleModuleMeta = {
  "fqcn": "ansible.builtin.get_url",
  "actionPlugin": false,
  "powershell": false,
  "rawParams": false,
  "checkMode": "partial",
} as const;
const spec: RemoteModuleSpec = { fqcn: "ansible.builtin.get_url" } as const;
export interface GetUrlArgs {
  /** The attributes the resulting filesystem object should have. */
  attributes?: string;
  /** Create a backup file including the timestamp information so you can get the original file back if you somehow clobbered it incorrectly. */
  backup?: boolean;
  /** If a checksum is passed to this parameter, the digest of the destination file will be calculated after it is downloaded to ensure its integrity and verify that the transfer completed successfully. Format: <algorithm>:<checksum|url>, for example C(checksum="sha256:D98291AC[...]B6DC7B97"), C(checksum="sha256:http://example.com/path/sha256sum.txt"). */
  checksum?: string;
  /** SSL/TLS Ciphers to use for the request. */
  ciphers?: string | string[];
  /** PEM formatted certificate chain file to be used for SSL client authentication. */
  client_cert?: string;
  /** PEM formatted file that contains your private key to be used for SSL client authentication. */
  client_key?: string;
  /** Whether to attempt to decompress gzip content-encoded responses. */
  decompress?: boolean;
  /** Absolute path of where to download the file to. */
  dest: string;
  /** If V(true) and O(dest) is not a directory, will download the file every time and replace the file if the contents change. If V(false), the file will only be downloaded if the destination does not exist. Generally should be V(true) only for small local files. */
  force?: boolean;
  /** Force the sending of the Basic authentication header upon initial request. */
  force_basic_auth?: boolean;
  /** Name of the group that should own the filesystem object, as would be fed to C(chown). */
  group?: string;
  /** Add custom HTTP headers to a request in hash/dict format. */
  headers?: Record<string, unknown>;
  /** Header to identify as, generally appears in web server logs. */
  http_agent?: string;
  /** The permissions the resulting filesystem object should have. */
  mode?: unknown;
  /** Name of the user that should own the filesystem object, as would be fed to C(chown). */
  owner?: string;
  /** The level part of the SELinux filesystem object context. */
  selevel?: string;
  /** The role part of the SELinux filesystem object context. */
  serole?: string;
  /** The type part of the SELinux filesystem object context. */
  setype?: string;
  /** The user part of the SELinux filesystem object context. */
  seuser?: string;
  /** Timeout in seconds for URL request. */
  timeout?: number;
  /** Absolute path of where temporary file is downloaded to. */
  tmp_dest?: string;
  /** A list of header names that will not be sent on subsequent redirected requests. This list is case insensitive. By default all headers will be redirected. In some cases it may be beneficial to list headers such as C(Authorization) here to avoid potential credential exposure. */
  unredirected_headers?: string | string[];
  /** Influence when to use atomic operation to prevent data corruption or inconsistent reads from the target filesystem object. */
  unsafe_writes?: boolean;
  /** HTTP, HTTPS, or FTP URL in the form C((http|https|ftp)://[user[:pass]]@host.domain[:port]/path). */
  url: string;
  /** The password for use in HTTP basic authentication. */
  url_password?: string;
  /** The username for use in HTTP basic authentication. */
  url_username?: string;
  /** Use GSSAPI to perform the authentication, typically this is for Kerberos or Kerberos through Negotiate authentication. */
  use_gssapi?: boolean;
  /** Determining whether to use credentials from C(~/.netrc) file. */
  use_netrc?: boolean;
  /** if V(false), it will not use a proxy, even if one is defined in an environment variable on the target hosts. */
  use_proxy?: boolean;
  /** If V(false), SSL certificates will not be validated. */
  validate_certs?: boolean;
}

export interface GetUrlReturn {
  /** name of backup file created after download */
  backup_file?: string;
  /** sha1 checksum of the file after copy */
  checksum_dest?: string;
  /** sha1 checksum of the file */
  checksum_src?: string;
  /** destination file/path */
  dest?: string;
  /** The number of seconds that elapsed while performing the download */
  elapsed?: number;
  /** group id of the file */
  gid?: number;
  /** group of the file */
  group?: string;
  /** md5 checksum of the file after download */
  md5sum?: string;
  /** permissions of the target */
  mode?: string;
  /** the HTTP message from the request */
  msg?: string;
  /** owner of the file */
  owner?: string;
  /** the SELinux security context of the file */
  secontext?: string;
  /** size of the target */
  size?: number;
  /** source file used after download */
  src?: string;
  /** state of the target */
  state?: string;
  /** the HTTP status code from the request */
  status_code?: number;
  /** owner id of the file, after execution */
  uid?: number;
  /** the actual URL used for the request */
  url?: string;
}
export const get_url = defineRemoteModule<GetUrlArgs, GetUrlReturn>(spec, meta);
