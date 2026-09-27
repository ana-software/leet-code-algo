import { sortArrayByParityII } from "./solution";

type Case = { input: Parameters<typeof sortArrayByParityII>; expected: ReturnType<typeof sortArrayByParityII> };

// Max-size input: 10^4 odd numbers followed by 10^4 even numbers (worst layout)
const half = 10000;
const big = [
  ...Array.from({ length: half }, (_, i) => (2 * i + 1) % 1000),
  ...Array.from({ length: half }, (_, i) => (2 * i) % 1000),
];
// Expected value for the big case is one valid arrangement (checked by validity, not equality)
const bigExpected = Array.from({ length: 2 * half }, (_, i) => (i % 2 === 0 ? 0 : 1));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[4, 2, 5, 7]], expected: [4, 5, 2, 7] },
  { input: [[2, 3]], expected: [2, 3] },
  // Edge: minimum size, both misplaced
  { input: [[3, 2]], expected: [2, 3] },
  // Edge: duplicates and zeros, all odds first
  { input: [[1, 1, 3, 0, 0, 2]], expected: [0, 1, 0, 1, 2, 3] },
  // Edge: maximum length, odds first then evens
  { input: [big], expected: bigExpected },
];

// Any valid arrangement is accepted: same multiset of values, and parity of each value matches its index
const isValid = (input: number[], output: number[]) => {
  if (output.length !== input.length) return false;
  if (!output.every((x, i) => x % 2 === i % 2)) return false;
  const a = [...input].sort((x, y) => x - y);
  const b = [...output].sort((x, y) => x - y);
  return a.every((x, i) => x === b[i]);
};

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = sortArrayByParityII(...args);
  const ms = (performance.now() - start).toFixed(3);
  const ok = isValid(input[0], output);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map(show).join(", ")}`);
  console.log(`  Output:   ${show(output)}`);
  console.log(`  Expected: ${show(expected)} (any valid arrangement)\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
