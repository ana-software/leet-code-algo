import { search } from "./solution";

type Case = { input: Parameters<typeof search>; expected: ReturnType<typeof search> };

// Max-size input: 10^4 sorted values -9999, -9997, ..., 9999
const big = Array.from({ length: 10000 }, (_, i) => -9999 + 2 * i);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
  { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
  // Edge: single element, found
  { input: [[5], 5], expected: 0 },
  // Edge: single element, not found
  { input: [[5], -5], expected: -1 },
  // Edge: target is the first / last element
  { input: [[-9999, -3, 0, 9999], -9999], expected: 0 },
  // Edge: maximum length, target is the last element
  { input: [big, 9999], expected: 9999 },
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
  const output = search(...args);
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
