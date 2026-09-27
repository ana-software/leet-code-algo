import { findMin } from "./solution";

type Case = { input: Parameters<typeof findMin>; expected: ReturnType<typeof findMin> };

// Max-size input: 0..4999 rotated so the minimum sits at index 4999
const big = [...Array.from({ length: 4999 }, (_, i) => i + 1), 0];

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[3, 4, 5, 1, 2]], expected: 1 },
  { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
  { input: [[11, 13, 15, 17]], expected: 11 },
  // Edge: single element
  { input: [[-5000]], expected: -5000 },
  // Edge: two elements, rotated once
  { input: [[2, 1]], expected: 1 },
  // Edge: maximum length, minimum at the very end
  { input: [big], expected: 0 },
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
  const output = findMin(...args);
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
