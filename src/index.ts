export {
  type AnsibleModuleMeta,
  type ModuleFn,
  ModuleError,
  define,
} from "src/module/module.ts";
export {
  defineRemoteModule,
  type RemoteModuleSpec,
} from "src/module/remote.ts";

import { currentHost as _currentHost } from "src/core/context.ts";
import { gatherFacts } from "src/core/backend.ts";
export { host, type HostRef } from "src/core/host.ts";
export type { HostFacts } from "src/core/facts.ts";
export type { SSHConfig } from "src/core/connection.ts";
import type { HostRef } from "src/core/host.ts";
import type { HostFacts } from "src/core/facts.ts";
export const currentHost = (): HostRef => _currentHost();
// Host facts from the server (in-memory cached). gatherAll=false → minimal subset.
export const facts = (gatherAll = false): Promise<HostFacts> =>
  gatherFacts(_currentHost(), gatherAll);
export { setEventHandler } from "src/core/events.ts";
export { setLogger, logReporter, withLevel } from "src/core/logger.ts";
export {
  bootstrap,
  ServerClient,
  type BootstrapOptions,
  type HostSpec,
  type GatherFactsParams,
  type Facts,
  type RunActionParams,
  type ActionStatus,
  type ResultFrame,
} from "src/core/server.ts";
