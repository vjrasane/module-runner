export class FatalError extends Error {}

export const isFatal = (e: unknown): e is FatalError => e instanceof FatalError;
