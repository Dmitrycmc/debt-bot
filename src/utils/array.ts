export const range = (n: number): number[] =>
    [...new Array(Math.max(0, n))].map((_, i) => i);
