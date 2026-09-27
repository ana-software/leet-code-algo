import { searchInsert } from "./solution";

type Case = { input: Parameters<typeof searchInsert>; expected: ReturnType<typeof searchInsert> };

// Max-size input: 10^4 distinct sorted values -10000, -9998, ..., 9998
const big = Array.from({ length: 10000 }, (_, i) => -10000 + 2 * i);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 3, 5, 6], 5], expected: 2 },
  { input: [[1, 3, 5, 6], 2], expected: 1 },
  { input: [[1, 3, 5, 6], 7], expected: 4 },
  // Edge: target smaller than everything -> insert at the front
  { input: [[1, 3, 5, 6], 0], expected: 0 },
  // Edge: single element, target equal to it
  { input: [[1], 1], expected: 0 },
  // Edge: negatives, target falls between two values
  { input: [[-10, -5, -1], -3], expected: 2 },
  // Edge: maximum length, target missing (-1 would go where 0 is)
  { input: [big, -1], expected: 5000 },
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
  const output = searchInsert(...args);
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
