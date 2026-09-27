import { threeSumClosest } from "./solution";

type Case = { input: Parameters<typeof threeSumClosest>; expected: ReturnType<typeof threeSumClosest> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[-1, 2, 1, -4], 1], expected: 2 },
  { input: [[0, 0, 0], 1], expected: 0 },
  // Edge: exact match exists
  { input: [[1, 2, 3, 4], 6], expected: 6 },
  // Edge: extreme negatives, target far below every sum
  { input: [[-1000, -1000, -1000, 1000], -10000], expected: -3000 },
  // Edge: extreme positives, target far above every sum
  { input: [[1000, 1000, 1000], 10000], expected: 3000 },
  // Edge: duplicates, target below every sum -> smallest triple (0 + 1 + 1)
  { input: [[1, 1, 1, 0], -100], expected: 2 },
];

const normalize = (x: unknown) => JSON.stringify(x);

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = threeSumClosest(...args);
  const ms = (performance.now() - start).toFixed(3);
  const ok = normalize(output) === normalize(expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map((a) => JSON.stringify(a)).join(", ")}`);
  console.log(`  Output:   ${JSON.stringify(output)}`);
  console.log(`  Expected: ${JSON.stringify(expected)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
