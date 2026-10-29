import pkg from "../../package.json" with { type: "json" };

export const packageName = pkg.name;

export const toolName = "module_runner";

export const env = (suffix: string) =>
  process.env[`${toolName.toUpperCase()}_${suffix}`];
