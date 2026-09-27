import { merge } from "./solution";

type Case = { input: Parameters<typeof merge>; expected: ReturnType<typeof merge> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
  { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
  { input: [[[4, 7], [1, 4]]], expected: [[1, 7]] },
  // Edge: single interval
  { input: [[[0, 0]]], expected: [[0, 0]] },
  // Edge: one interval contains the others (end must not shrink)
  { input: [[[1, 10], [2, 3], [4, 5]]], expected: [[1, 10]] },
  // Edge: duplicates and zero-length intervals at the bounds
  { input: [[[10000, 10000], [0, 0], [0, 0], [5, 10000]]], expected: [[0, 0], [5, 10000]] },
];

// LeetCode accepts the merged intervals in any order
const normalize = (x: number[][]) => JSON.stringify([...x].sort((a, b) => a[0] - b[0] || a[1] - b[1]));

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = merge(...args);
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
