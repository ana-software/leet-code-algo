import { twoSum } from "./solution";

type Case = { input: Parameters<typeof twoSum>; expected: ReturnType<typeof twoSum> };

// Max-size input: the only valid pair sits at the very end
const big = Array.from({ length: 10000 }, (_, i) => i + 1);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 2, 4], 6], expected: [1, 2] },
  { input: [[3, 3], 6], expected: [0, 1] },
  // Edge: negatives and a negative target
  { input: [[-3, 4, 3, 90], 0], expected: [0, 2] },
  // Edge: extreme values
  { input: [[1000000000, -1000000000, 5], 0], expected: [0, 1] },
  // Edge: maximum length, answer is the last two elements
  { input: [big, 19999], expected: [9998, 9999] },
];

// "Any order" is accepted, so compare sorted index pairs
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
  const output = twoSum(...args);
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
