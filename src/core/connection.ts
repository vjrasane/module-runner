// Connection configuration (design §4.4). The server owns all actual connecting via
// ansible's connection plugins; TS only describes a host as data, which hostSpecFor
// (backend.ts) forwards verbatim as the ansible connection var bag.

export interface SSHConfig {
  host: string;
  user?: string;
  port?: number;
  identityFile?: string;
}

export type ConnectionSpec =
  | { type: "local" }
  | { type: "ssh"; config: SSHConfig };

export interface SudoBecomeOpts {
  mode?: "sudo";
  user?: string;
  password?: string;
}

export interface SuBecomeOpts {
  mode: "su";
  user?: string;
}

export type BecomeOpts = SudoBecomeOpts | SuBecomeOpts;
