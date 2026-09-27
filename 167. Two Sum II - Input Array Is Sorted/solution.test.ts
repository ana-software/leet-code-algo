import { twoSum } from "./solution";

type Case = { input: Parameters<typeof twoSum>; expected: ReturnType<typeof twoSum> };

// Big sorted array for the max-size edge case: 30000 values, only -1000 and 1000 sum to 0
const big = [-1000, ...Array.from({ length: 29998 }, () => 1), 1000];

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[2, 7, 11, 15], 9], expected: [1, 2] },
  { input: [[2, 3, 4], 6], expected: [1, 3] },
  { input: [[-1, 0], -1], expected: [1, 2] },
  // Edge: duplicates form the answer (can't reuse the same element)
  { input: [[0, 0, 3, 4], 0], expected: [1, 2] },
  // Edge: all negatives, answer at the far right
  { input: [[-10, -8, -5, -3, -1], -4], expected: [4, 5] },
  // Edge: min/max values, answer at both ends
  { input: [[-1000, -5, 3, 7, 1000], 0], expected: [1, 5] },
  // Edge: maximum length (3 * 10^4)
  { input: [big, 0], expected: [1, 30000] },
];

// Exactly one solution is guaranteed, so exact comparison is fine
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
  const output = twoSum(...args);
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
