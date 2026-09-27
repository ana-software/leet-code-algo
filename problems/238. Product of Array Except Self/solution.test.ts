import { productExceptSelf } from "./solution";

type Case = { input: Parameters<typeof productExceptSelf>; expected: ReturnType<typeof productExceptSelf> };

// Max-size input: 10^5 ones (products stay within 32 bits)
const big = new Array<number>(100000).fill(1);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
  { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
  // Edge: minimum length
  { input: [[2, 3]], expected: [3, 2] },
  // Edge: two zeros make every product zero
  { input: [[0, 4, 0]], expected: [0, 0, 0] },
  // Edge: negatives only
  { input: [[-2, -3, -4]], expected: [12, 8, 6] },
  // Edge: maximum length
  { input: [big], expected: big },
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
  const output = productExceptSelf(...args);
  const ms = (performance.now() - start).toFixed(3);
  // JSON.stringify prints -0 as 0, like LeetCode's judge
  const ok = normalize(output) === normalize(expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${input.map(show).join(", ")}`);
  console.log(`  Output:   ${show(output)}`);
  console.log(`  Expected: ${show(expected)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
