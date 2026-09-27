import { minSubArrayLen } from "./solution";

type Case = { input: Parameters<typeof minSubArrayLen>; expected: ReturnType<typeof minSubArrayLen> };

// Max-size input: 10^5 elements of 10^4 (total 10^9)
const big = Array.from({ length: 100000 }, () => 10000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
  { input: [4, [1, 4, 4]], expected: 1 },
  { input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
  // Edge: single element that meets the target (minimum size)
  { input: [1, [1]], expected: 1 },
  // Edge: whole array needed exactly
  { input: [15, [1, 2, 3, 4, 5]], expected: 5 },
  // Edge: maximum target and length, whole array sums to exactly 10^9
  { input: [1000000000, big], expected: 100000 },
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
  const output = minSubArrayLen(...args);
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
