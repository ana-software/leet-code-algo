import { mySqrt } from "./solution";

type Case = { input: Parameters<typeof mySqrt>; expected: ReturnType<typeof mySqrt> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [4], expected: 2 },
  { input: [8], expected: 2 },
  // Edge: minimum values
  { input: [0], expected: 0 },
  { input: [1], expected: 1 },
  // Edge: just below a perfect square
  { input: [99], expected: 9 },
  // Edge: maximum value 2^31 - 1
  { input: [2147483647], expected: 46340 },
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
  const output = mySqrt(...args);
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
