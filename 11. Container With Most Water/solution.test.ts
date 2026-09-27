import { maxArea } from "./solution";

type Case = { input: Parameters<typeof maxArea>; expected: ReturnType<typeof maxArea> };

// Max-size input: 10^5 lines of height 10^4 -> 10^4 * (10^5 - 1)
const big = Array.from({ length: 100000 }, () => 10000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
  { input: [[1, 1]], expected: 1 },
  // Edge: zero heights hold no water
  { input: [[0, 0]], expected: 0 },
  // Edge: best pair is in the middle, not at the ends
  { input: [[1, 2, 100, 100, 2, 1]], expected: 100 },
  // Edge: strictly decreasing heights
  { input: [[5, 4, 3, 2, 1]], expected: 6 },
  // Edge: maximum length and heights
  { input: [big], expected: 999990000 },
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
  const output = maxArea(...args);
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
