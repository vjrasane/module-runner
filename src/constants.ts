// The ansible-jsonrpc-server release this client provisions, and the integrity pin for its
// bootstrap script — a top-level dependency of the whole library, so it lives here rather
// than buried in a module. Bump SERVER_VERSION on a server upgrade; BOOTSTRAP_SHA256 changes
// only when the (version-agnostic) bootstrap script itself changes, not every release.
// Verify a bump against the live tag with `npm run check:bootstrap`.
export const SERVER_VERSION = "0.0.9";
export const BOOTSTRAP_SHA256 =
  "a4c76e25ef961fee6e59faa627f7649bc34a0d29e7a4ab37d152639154e82cce";
export const BOOTSTRAP_URL = `https://raw.githubusercontent.com/vjrasane/ansible-jsonrpc-server/v${SERVER_VERSION}/bootstrap/v1/bootstrap.sh`;
