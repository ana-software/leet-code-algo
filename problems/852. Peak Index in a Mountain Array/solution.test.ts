import { peakIndexInMountainArray } from "./solution";

type Case = { input: Parameters<typeof peakIndexInMountainArray>; expected: ReturnType<typeof peakIndexInMountainArray> };

// Max-size input: 10^5 elements climbing to index 70000, then falling
const big = Array.from({ length: 100000 }, (_, i) => (i <= 70000 ? i : 140000 - i));

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[0, 1, 0]], expected: 1 },
  { input: [[0, 2, 1, 0]], expected: 1 },
  { input: [[0, 10, 5, 2]], expected: 1 },
  // Edge: peak right before the last element
  { input: [[1, 2, 3, 4, 5, 0]], expected: 4 },
  // Edge: peak value at the maximum 10^6
  { input: [[3, 5, 1000000, 7]], expected: 2 },
  // Edge: maximum length
  { input: [big], expected: 70000 },
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
  const output = peakIndexInMountainArray(...args);
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
