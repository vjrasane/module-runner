interface RetryOpts {
  attempts: number;
  retryOn?: (err: any) => boolean;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOpts,
): Promise<T> {
  const { retryOn = () => true } = opts;
  try {
    return await fn();
  } catch (e) {
    if (opts.attempts > 0 && retryOn(e))
      return withRetry(fn, { ...opts, attempts: opts.attempts - 1 });
    throw e;
  }
}

export const shquote = (s: string) => `'${s.replaceAll("'", `'\\''`)}'`;

export const shquoteArgv = (argv: string[]) => argv.map(shquote).join(" ");
