// Drift guard for the bootstrap-script pin: fetch the script at the pinned release URL,
// hash it, and compare against the BOOTSTRAP_SHA256 stored in src/constants.ts. Prints both
// and exits non-zero on mismatch — run after bumping SERVER_VERSION or when the server repo's
// bootstrap script may have changed.
import { createHash } from "node:crypto";
import {
  BOOTSTRAP_SHA256,
  BOOTSTRAP_URL,
  SERVER_VERSION,
} from "src/constants.ts";

async function main(): Promise<void> {
  const res = await fetch(BOOTSTRAP_URL);
  if (!res.ok) {
    console.error(`fetch ${BOOTSTRAP_URL} → ${res.status}`);
    process.exit(1);
  }
  const fetched = createHash("sha256")
    .update(Buffer.from(await res.arrayBuffer()))
    .digest("hex");
  const match = fetched === BOOTSTRAP_SHA256;

  console.log(`version: ${SERVER_VERSION}`);
  console.log(`url:     ${BOOTSTRAP_URL}`);
  console.log(`stored:  ${BOOTSTRAP_SHA256}`);
  console.log(`fetched: ${fetched}`);
  console.log(match ? "MATCH" : "MISMATCH");
  process.exit(match ? 0 : 1);
}

main();
