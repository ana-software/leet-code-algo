import { subarraySum } from "./solution";

type Case = { input: Parameters<typeof subarraySum>; expected: ReturnType<typeof subarraySum> };

// Max-size input: 2 * 10^4 zeros, k = 0 -> every subarray counts: n(n+1)/2
const n = 20000;
const zeros = Array.from({ length: n }, () => 0);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 1, 1], 2], expected: 2 },
  { input: [[1, 2, 3], 3], expected: 2 },
  // Edge: single element not equal to k (minimum size)
  { input: [[1], 0], expected: 0 },
  // Edge: negatives, where a sliding window would fail
  { input: [[1, -1, 0], 0], expected: 3 },
  // Edge: negative k
  { input: [[-1, -1, 1], -1], expected: 3 },
  // Edge: maximum length, all zeros with k = 0
  { input: [zeros, 0], expected: (n * (n + 1)) / 2 },
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
  const output = subarraySum(...args);
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
