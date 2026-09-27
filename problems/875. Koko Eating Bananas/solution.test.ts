import { minEatingSpeed } from "./solution";

type Case = { input: Parameters<typeof minEatingSpeed>; expected: ReturnType<typeof minEatingSpeed> };

// Max-size input: 10^4 piles of 10^9 bananas each
const big = Array.from({ length: 10000 }, () => 1000000000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[3, 6, 7, 11], 8], expected: 4 },
  { input: [[30, 11, 23, 4, 20], 5], expected: 30 },
  { input: [[30, 11, 23, 4, 20], 6], expected: 23 },
  // Edge: single pile, one banana
  { input: [[1], 1], expected: 1 },
  // Edge: single huge pile with lots of time
  { input: [[1000000000], 1000000000], expected: 1 },
  // Edge: single huge pile, two hours
  { input: [[1000000000], 2], expected: 500000000 },
  // Edge: maximum length and values, h = 10^9 -> 10^5 hours per pile
  { input: [big, 1000000000], expected: 10000 },
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
  const output = minEatingSpeed(...args);
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
