import { rotate } from "./solution";

type Case = { input: Parameters<typeof rotate>; expected: number[][] };

// Max-size input: 20x20 with distinct values; expected built from new[j][n-1-i] = old[i][j]
const N = 20;
const big = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => i * N + j - 200));
const bigRotated = Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => big[N - 1 - c][r]));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
  { input: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]],
    expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] },
  // Edge: 1x1 matrix is unchanged
  { input: [[[-1000]]], expected: [[-1000]] },
  // Edge: 2x2 with extreme values
  { input: [[[1000, -1000], [0, 1]]], expected: [[0, 1000], [1, -1000]] },
  // Edge: maximum size 20x20
  { input: [big], expected: bigRotated },
];

const normalize = (x: unknown) => JSON.stringify(x);

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  rotate(...args);
  const ms = (performance.now() - start).toFixed(3);
  // In-place problem: the output is the mutated matrix
  const output = args[0];
  const ok = normalize(output) === normalize(expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map(show).join(", ")}`);
  console.log(`  Output:   ${show(output)}`);
  console.log(`  Expected: ${show(expected)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
