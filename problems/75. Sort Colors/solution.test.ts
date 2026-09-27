import { sortColors } from "./solution";

type Case = { input: Parameters<typeof sortColors>; expected: number[] };

// Max-size input: 300 elements in descending color blocks
const big = Array.from({ length: 300 }, (_, i) => 2 - Math.floor(i / 100));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2] },
  { input: [[2, 0, 1]], expected: [0, 1, 2] },
  // Edge: single element
  { input: [[1]], expected: [1] },
  // Edge: only one color
  { input: [[2, 2, 2]], expected: [2, 2, 2] },
  // Edge: 2 swapped in from the right must be re-examined
  { input: [[2, 2, 0, 0]], expected: [0, 0, 2, 2] },
  // Edge: maximum length, fully reversed
  { input: [big], expected: [...big].sort((a, b) => a - b) },
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
  sortColors(...args);
  const ms = (performance.now() - start).toFixed(3);
  // In-place problem: the output is the mutated array
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
