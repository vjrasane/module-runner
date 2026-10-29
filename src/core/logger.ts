import {
  EventHandler,
  setEventHandler,
  SpanEndEvent,
  SpanEvent,
} from "./events.ts";
import { env } from "src/core/config.ts";

const logLevels = { trace: 0, debug: 1, info: 2, warn: 3, error: 4 } as const;

export type LogLevel = keyof typeof logLevels;

export const LOG_LEVEL: LogLevel =
  (Object.keys(logLevels).find((k) => k === env("LOG_LEVEL")) as LogLevel) ??
  "info";

export interface Logger {
  log(level: LogLevel, message: string, fields?: Record<string, unknown>): void;
}

export class LogReporter {
  constructor(private logger: Logger) {}

  report = (event: SpanEvent) => {
    switch (event.kind) {
      case "step":
        return this.reportStep(event);
      case "fetch":
        return this.reportCache(event, "info");
      case "payload":
        return this.reportCache(event, "debug");
    }
  };

  private reportCache = (e: SpanEvent, level: LogLevel) => {
    if (e.phase === "start")
      return this.logger.log(level, `${e.name} ...`, {
        kind: e.kind,
        name: e.name,
      });
    // A provisioning failure must surface regardless of the kind's base level.
    const failed = e.status === "failed";
    const size = e.bytes ? ` ${formatBytes(e.bytes)}` : "";
    return this.logger.log(
      failed ? "error" : level,
      `${e.name} ${e.status} (${e.ms}ms)${size}`,
      {
        kind: e.kind,
        name: e.name,
        status: e.status,
        ms: e.ms,
        ...(e.bytes && { bytes: e.bytes }),
        ...(e.error && { error: e.error }),
      },
    );
  };

  private reportStep = (e: SpanEvent) => {
    switch (e.phase) {
      case "start": {
        const message = `${e.host} ${e.name} ...`;
        const fields: Record<string, unknown> = {
          kind: e.kind,
          phase: e.phase,
          host: e.host,
          name: e.name,
        };
        return this.logger.log("info", message, fields);
      }
      case "end": {
        return this.reportResult(e);
      }
    }
  };

  private reportResult = (e: SpanEndEvent) => {
    const fields: Record<string, unknown> = {
      host: e.host,
      fqcn: e.name,
      status: e.status,
      changed: e.changed,
      ms: e.ms,
      ...(e.error && { error: e.error }),
    };
    const message = `${e.host}  ${e.name} ${e.status} (${e.ms}ms)`;
    switch (e.status) {
      case "ok":
      case "changed":
      case "skipped":
        return this.logger.log("info", message, fields);
      case "failed":
      case "unreachable":
        return this.logger.log("error", message, fields);
    }
  };
}

function formatBytes(n: number): string {
  const units = ["B", "KiB", "MiB", "GiB"];
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${i === 0 ? n : n.toFixed(1)}${units[i]}`;
}

export const consoleLogger: Logger = {
  log: (l, m, f) => console[l === "trace" ? "debug" : l](m, f ?? ""),
};

export function withLevel(inner: Logger, min: LogLevel): Logger {
  const order = { trace: 0, debug: 1, info: 2, warn: 3, error: 4 };
  return { log: (l, m, f) => order[l] >= order[min] && inner.log(l, m, f) };
}

export function logReporter(logger: Logger): EventHandler {
  return new LogReporter(logger).report;
}

export function setLogger(l: Logger) {
  setEventHandler(logReporter(l));
}
