import { removeElement } from "./solution";

// expected = LeetCode's expectedNums: the kept values, sorted
type Case = { input: Parameters<typeof removeElement>; expected: number[] };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[3, 2, 2, 3], 3], expected: [2, 2] },
  { input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: [0, 0, 1, 3, 4] },
  // Edge: empty array (minimum size)
  { input: [[], 0], expected: [] },
  // Edge: every element equals val
  { input: [[5, 5, 5], 5], expected: [] },
  // Edge: val not present (val above the element range)
  { input: [[50, 0, 50], 100], expected: [0, 50, 50] },
];

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const k = removeElement(...args);
  const ms = (performance.now() - start).toFixed(3);
  // Custom judge: k must match, and the first k elements (sorted) must equal expectedNums
  const firstK = args[0].slice(0, k).sort((a, b) => a - b);
  const ok = k === expected.length && JSON.stringify(firstK) === JSON.stringify(expected);
  if (ok) passed++;
  const shown = [...args[0].slice(0, k), ...Array(args[0].length - k).fill("_")];
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map((a) => JSON.stringify(a)).join(", ")}`);
  console.log(`  Output:   ${k}, nums = ${JSON.stringify(shown).replace(/"_"/g, "_")}`);
  console.log(`  Expected: ${expected.length}, nums = ${JSON.stringify(expected)} (any order)\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
