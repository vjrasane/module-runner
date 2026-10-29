import { defineConfig } from "vitest/config";

// Resolve the tsconfig `baseUrl` (`src/*` bare imports); vitest 5 no longer honors it
// implicitly the way v3 did, but Vite resolves tsconfig paths natively via this option.
export default defineConfig({
  resolve: { tsconfigPaths: true },
});
