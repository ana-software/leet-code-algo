import { search } from "./solution";

type Case = { input: Parameters<typeof search>; expected: ReturnType<typeof search> };

// Max-size input: 0..4999 left rotated by 2500 -> [2500..4999, 0..2499]
const big = Array.from({ length: 5000 }, (_, i) => (i + 2500) % 5000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
  { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
  { input: [[1], 0], expected: -1 },
  // Edge: not rotated at all
  { input: [[1, 2, 3, 4, 5], 4], expected: 3 },
  // Edge: two elements, rotated, target is the second one
  { input: [[3, 1], 1], expected: 1 },
  // Edge: negatives, target in the left (larger) half
  { input: [[-2, 0, 5, -10, -7], 0], expected: 1 },
  // Edge: maximum length, target just before the rotation point
  { input: [big, 4999], expected: 2499 },
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
  const output = search(...args);
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
