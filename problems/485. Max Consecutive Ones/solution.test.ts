import { findMaxConsecutiveOnes } from "./solution";

type Case = { input: Parameters<typeof findMaxConsecutiveOnes>; expected: ReturnType<typeof findMaxConsecutiveOnes> };

// Max-size input: 10^5 ones
const big = Array.from({ length: 100000 }, () => 1);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 1, 0, 1, 1, 1]], expected: 3 },
  { input: [[1, 0, 1, 1, 0, 1]], expected: 2 },
  // Edge: single zero (minimum size, no ones)
  { input: [[0]], expected: 0 },
  // Edge: all zeros
  { input: [[0, 0, 0, 0]], expected: 0 },
  // Edge: longest run at the very start
  { input: [[1, 1, 1, 1, 0, 1]], expected: 4 },
  // Edge: maximum length, all ones
  { input: [big], expected: 100000 },
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
  const output = findMaxConsecutiveOnes(...args);
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
