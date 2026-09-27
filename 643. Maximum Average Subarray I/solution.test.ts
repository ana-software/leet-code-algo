import { findMaxAverage } from "./solution";

type Case = { input: Parameters<typeof findMaxAverage>; expected: ReturnType<typeof findMaxAverage> };

// Max-size input: 10^5 elements alternating -10^4 / 10^4
const big = Array.from({ length: 100000 }, (_, i) => (i % 2 ? 10000 : -10000));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 12, -5, -6, 50, 3], 4], expected: 12.75 },
  { input: [[5], 1], expected: 5 },
  // Edge: k == n, the whole array is the only window
  { input: [[3, -1, 4, 1], 4], expected: 1.75 },
  // Edge: all negatives
  { input: [[-1, -12, -5, -6, -50, -3], 2], expected: -5.5 },
  // Edge: non-terminating average (needs the 1e-5 tolerance)
  { input: [[1, 1, 2, 0], 3], expected: 4 / 3 },
  // Edge: maximum length, k = 1 picks the single largest value
  { input: [big, 1], expected: 10000 },
];

// LeetCode accepts any answer within 1e-5 of the expected value
const matches = (output: number, expected: number) => Math.abs(output - expected) < 1e-5;

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = findMaxAverage(...args);
  const ms = (performance.now() - start).toFixed(3);
  const ok = matches(output, expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map(show).join(", ")}`);
  console.log(`  Output:   ${output.toFixed(5)}`);
  console.log(`  Expected: ${expected.toFixed(5)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
