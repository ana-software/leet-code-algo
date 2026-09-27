import { intersect } from "./solution";

type Case = { input: Parameters<typeof intersect>; expected: ReturnType<typeof intersect> };

// Max-size input: 1000 values each, 0..999 vs 500..1499 clipped to 1000
const bigA = Array.from({ length: 1000 }, (_, i) => i);
const bigB = Array.from({ length: 1000 }, (_, i) => Math.min(500 + i, 1000));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 2, 2, 1], [2, 2]], expected: [2, 2] },
  { input: [[4, 9, 5], [9, 4, 9, 8, 4]], expected: [4, 9] },
  // Edge: no common elements
  { input: [[1, 2, 3], [4, 5, 6]], expected: [] },
  // Edge: minimum size, value 0
  { input: [[0], [0]], expected: [0] },
  // Edge: duplicates capped by the smaller count
  { input: [[1, 1, 1, 2], [1, 1, 2, 2, 2]], expected: [1, 1, 2] },
  // Edge: maximum length
  { input: [bigA, bigB], expected: Array.from({ length: 500 }, (_, i) => 500 + i) },
];

// Any order is accepted, so compare sorted copies
const normalize = (x: number[]) => JSON.stringify([...x].sort((a, b) => a - b));

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = intersect(...args);
  const ms = (performance.now() - start).toFixed(3);
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
