import { maxProfit } from "./solution";

type Case = { input: Parameters<typeof maxProfit>; expected: ReturnType<typeof maxProfit> };

// Max-size input: prices fall from 10^4 to 0, then the last day jumps back to 10^4
const big = Array.from({ length: 100000 }, (_, i) => Math.max(0, 10000 - i));
big[big.length - 1] = 10000;

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
  { input: [[7, 6, 4, 3, 1]], expected: 0 },
  // Edge: single day, no transaction possible
  { input: [[5]], expected: 0 },
  // Edge: the global max comes before the global min
  { input: [[2, 4, 1]], expected: 2 },
  // Edge: all equal prices
  { input: [[3, 3, 3]], expected: 0 },
  // Edge: maximum length and maximum profit
  { input: [big], expected: 10000 },
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
  const output = maxProfit(...args);
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
