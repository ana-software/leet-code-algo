import { maxSubArray } from "./solution";

type Case = { input: Parameters<typeof maxSubArray>; expected: ReturnType<typeof maxSubArray> };

// Max-size input: 10^5 elements, all equal to 10^4 -> whole array is best
const big = Array.from({ length: 100000 }, () => 10000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
  { input: [[1]], expected: 1 },
  { input: [[5, 4, -1, 7, 8]], expected: 23 },
  // Edge: all negatives -> the single largest element
  { input: [[-3, -1, -2]], expected: -1 },
  // Edge: single negative element (minimum size, minimum value)
  { input: [[-10000]], expected: -10000 },
  // Edge: maximum length and values
  { input: [big], expected: 1000000000 },
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
  const output = maxSubArray(...args);
  const ms = (performance.now() - start).toFixed(3);
  const ok = normalize(output) === normalize(expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map(show).join(", ")}`);
  console.log(`  Output:   ${JSON.stringify(output)}`);
  console.log(`  Expected: ${JSON.stringify(expected)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
