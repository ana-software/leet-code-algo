import { findMaxLength } from "./solution";

type Case = { input: Parameters<typeof findMaxLength>; expected: ReturnType<typeof findMaxLength> };

// Max-size input: 5 * 10^4 zeros followed by 5 * 10^4 ones -> the whole array is balanced
const n = 100000;
const halves = Array.from({ length: n }, (_, i) => (i < n / 2 ? 0 : 1));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[0, 1]], expected: 2 },
  { input: [[0, 1, 0]], expected: 2 },
  { input: [[0, 1, 1, 1, 1, 1, 0, 0, 0]], expected: 6 },
  // Edge: minimum size, no balanced subarray possible
  { input: [[0]], expected: 0 },
  // Edge: all the same value
  { input: [[1, 1, 1, 1]], expected: 0 },
  // Edge: maximum length, whole array balanced
  { input: [halves], expected: n },
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
  const output = findMaxLength(...args);
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
