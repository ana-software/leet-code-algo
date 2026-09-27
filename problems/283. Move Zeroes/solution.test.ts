import { moveZeroes } from "./solution";

type Case = { input: Parameters<typeof moveZeroes>; expected: number[] };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
  { input: [[0]], expected: [0] },
  // Edge: no zeros, array unchanged
  { input: [[1, 2, 3]], expected: [1, 2, 3] },
  // Edge: all zeros
  { input: [[0, 0, 0]], expected: [0, 0, 0] },
  // Edge: negatives and 32-bit extremes keep their order
  { input: [[-2147483648, 0, 2147483647, 0, -1]], expected: [-2147483648, 2147483647, -1, 0, 0] },
];

const normalize = (x: unknown) => JSON.stringify(x);

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  moveZeroes(...args);
  const ms = (performance.now() - start).toFixed(3);
  // In-place problem: the output is the mutated array
  const output = args[0];
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
