import { fourSum } from "./solution";

type Case = { input: Parameters<typeof fourSum>; expected: ReturnType<typeof fourSum> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 0, -1, 0, -2, 2], 0], expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
  { input: [[2, 2, 2, 2, 2], 8], expected: [[2, 2, 2, 2]] },
  // Edge: minimum size, fewer than four numbers
  { input: [[1], 1], expected: [] },
  // Edge: extreme values, sum beyond 32-bit range (4e9 != target)
  { input: [[1e9, 1e9, 1e9, 1e9], -294967296], expected: [] },
  // Edge: negatives and many duplicates
  { input: [[-3, -3, -1, -1, 0, 0, 2, 2, 3, 3], 0], expected: [[-3, -3, 3, 3], [-3, -1, 2, 2], [-3, 0, 0, 3], [-1, -1, 0, 2]] },
];

// Any order is accepted: sort inside each quadruplet, then sort the list
const normalize = (x: number[][]) =>
  JSON.stringify(x.map((q) => [...q].sort((a, b) => a - b)).sort((a, b) => {
    for (let k = 0; k < 4; k++) if (a[k] !== b[k]) return a[k] - b[k];
    return 0;
  }));

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = fourSum(...args);
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
