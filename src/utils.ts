export const shquote = (s: string) => `'${s.replaceAll("'", `'\\''`)}'`;

export const shquoteArgv = (argv: string[]) => argv.map(shquote).join(" ");
