import { maxSideLength } from "./solution";

type Case = { input: Parameters<typeof maxSideLength>; expected: ReturnType<typeof maxSideLength> };

// Max-size input: 300 x 300 matrix of ones
const big = Array.from({ length: 300 }, () => new Array(300).fill(1));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[[1, 1, 3, 2, 4, 3, 2], [1, 1, 3, 2, 4, 3, 2], [1, 1, 3, 2, 4, 3, 2]], 4], expected: 2 },
  { input: [[[2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2]], 1], expected: 0 },
  // Edge: 1 x 1 matrix that fits
  { input: [[[0]], 0], expected: 1 },
  // Edge: threshold 0, only an all-zero square counts
  { input: [[[0, 0, 5], [0, 0, 5], [5, 5, 5]], 0], expected: 2 },
  // Edge: non-square matrix, answer limited by the short side
  { input: [[[1, 1, 1, 1, 1]], 100], expected: 1 },
  // Edge: maximum size, 300 x 300 ones, threshold 10^5 -> whole matrix (sum 90000)
  { input: [big, 100000], expected: 300 },
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
  const output = maxSideLength(...args);
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
