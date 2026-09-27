import { myPow } from "./solution";

type Case = { input: Parameters<typeof myPow>; expected: ReturnType<typeof myPow> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [2.0, 10], expected: 1024.0 },
  { input: [2.1, 3], expected: 9.261 },
  { input: [2.0, -2], expected: 0.25 },
  // Edge: n = 0
  { input: [-50.5, 0], expected: 1 },
  // Edge: negative base, odd power
  { input: [-2.0, 3], expected: -8 },
  // Edge: n = -2^31 (the minimum; its absolute value doesn't fit in int32)
  { input: [1.0, -2147483648], expected: 1 },
  // Edge: n = 2^31 - 1 with |x| = 1
  { input: [-1.0, 2147483647], expected: -1 },
];

// LeetCode accepts answers within 10^-5 of the expected value
const close = (a: number, b: number) => Math.abs(a - b) < 1e-5;

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = myPow(...args);
  const ms = (performance.now() - start).toFixed(3);
  const ok = close(output, expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map(show).join(", ")}`);
  console.log(`  Output:   ${JSON.stringify(output)}`);
  console.log(`  Expected: ${JSON.stringify(expected)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
