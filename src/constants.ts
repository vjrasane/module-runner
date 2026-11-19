// The ansible-jsonrpc-server release this client provisions, and the integrity pin for its
// bootstrap script — a top-level dependency of the whole library, so it lives here rather
// than buried in a module. Bump SERVER_VERSION on a server upgrade; BOOTSTRAP_SHA256 changes
// only when the (version-agnostic) bootstrap script itself changes, not every release.
// Verify a bump against the live tag with `npm run check:bootstrap`.
export const SERVER_VERSION = "1.0.1";
export const BOOTSTRAP_SHA256 =
  "5330259472a85d8b9d76dc5f6158906f402f258c1600e785af5aa20c65fb75e1";
export const BOOTSTRAP_URL = `https://raw.githubusercontent.com/vjrasane/ansible-jsonrpc-server/v${SERVER_VERSION}/bootstrap/v1/bootstrap.sh`;
