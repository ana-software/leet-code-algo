import { trap } from "./solution";

type Case = { input: Parameters<typeof trap>; expected: ReturnType<typeof trap> };

// Max-size input: two walls of height 10^5 with 2 * 10^4 - 2 empty cells between them
const n = 20000;
const basin = Array.from({ length: n }, (_, i) => (i === 0 || i === n - 1 ? 100000 : 0));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
  { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
  // Edge: minimum size, a single bar holds nothing
  { input: [[5]], expected: 0 },
  // Edge: strictly increasing heights, nothing trapped
  { input: [[1, 2, 3, 4, 5]], expected: 0 },
  // Edge: equal walls with duplicates in between
  { input: [[3, 1, 1, 3]], expected: 4 },
  // Edge: maximum length and maximum heights
  { input: [basin], expected: 100000 * (n - 2) },
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
  const output = trap(...args);
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
