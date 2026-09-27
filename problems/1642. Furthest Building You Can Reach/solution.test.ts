import { furthestBuilding } from "./solution";

type Case = { input: Parameters<typeof furthestBuilding>; expected: ReturnType<typeof furthestBuilding> };

// Max-size input: 10^5 buildings alternating 1 and 10^6, enough bricks for everything
const big = Array.from({ length: 100000 }, (_, i) => (i % 2 === 0 ? 1 : 1000000));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[4, 2, 7, 6, 9, 14, 12], 5, 1], expected: 4 },
  { input: [[4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2], expected: 7 },
  { input: [[14, 3, 19, 3], 17, 0], expected: 3 },
  // Edge: single building
  { input: [[5], 0, 0], expected: 0 },
  // Edge: no bricks, no ladders, first step goes up
  { input: [[1, 2], 0, 0], expected: 0 },
  // Edge: only going down is free
  { input: [[9, 7, 5, 3, 1], 0, 0], expected: 4 },
  // Edge: maximum length, climbs of 999999: bricks cover 1000 of them, then run out
  { input: [big, 1000000000, 0], expected: 2000 },
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
  const output = furthestBuilding(...args);
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
