import { smallestDivisor } from "./solution";

type Case = { input: Parameters<typeof smallestDivisor>; expected: ReturnType<typeof smallestDivisor> };

// Max-size input: 5 * 10^4 values of 10^6, threshold 10^6 -> 20 per value
const big = Array.from({ length: 50000 }, () => 1000000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 2, 5, 9], 6], expected: 5 },
  { input: [[44, 22, 33, 11, 1], 5], expected: 44 },
  // Edge: single element, threshold equals the length
  { input: [[1000000], 1], expected: 1000000 },
  // Edge: threshold large enough for divisor 1
  { input: [[2, 3, 5], 10], expected: 1 },
  // Edge: duplicates
  { input: [[7, 7, 7], 6], expected: 4 },
  // Edge: maximum length and values
  { input: [big, 1000000], expected: 50000 },
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
  const output = smallestDivisor(...args);
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
