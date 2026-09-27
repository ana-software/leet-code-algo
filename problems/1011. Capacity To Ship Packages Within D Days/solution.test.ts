import { shipWithinDays } from "./solution";

type Case = { input: Parameters<typeof shipWithinDays>; expected: ReturnType<typeof shipWithinDays> };

// Max-size input: 5 * 10^4 packages of weight 500
const big = Array.from({ length: 50000 }, () => 500);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], expected: 15 },
  { input: [[3, 2, 2, 4, 1, 4], 3], expected: 6 },
  { input: [[1, 2, 3, 1, 1], 4], expected: 3 },
  // Edge: single package
  { input: [[500], 1], expected: 500 },
  // Edge: one day -> the ship carries everything at once
  { input: [[1, 2, 3], 1], expected: 6 },
  // Edge: days == packages -> the heaviest package decides
  { input: [[4, 9, 2, 7], 4], expected: 9 },
  // Edge: maximum length, 2 days -> half the total
  { input: [big, 2], expected: 12500000 },
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
  const output = shipWithinDays(...args);
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
