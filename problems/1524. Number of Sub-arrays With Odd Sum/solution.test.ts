import { numOfSubarrays } from "./solution";

type Case = { input: Parameters<typeof numOfSubarrays>; expected: ReturnType<typeof numOfSubarrays> };

// Max-size input: 10^5 ones -> 50000 odd prefixes, 50001 even prefixes (incl. empty);
// answer = 50000 * 50001 = 2500050000, mod 10^9 + 7 = 500049986
const ones = Array.from({ length: 100000 }, () => 1);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [[1, 3, 5]], expected: 4 },
  { input: [[2, 4, 6]], expected: 0 },
  { input: [[1, 2, 3, 4, 5, 6, 7]], expected: 16 },
  // Edge: minimum size, single odd element
  { input: [[1]], expected: 1 },
  // Edge: minimum size, single even element at the value limit
  { input: [[100]], expected: 0 },
  // Edge: maximum length, answer exceeds the modulus
  { input: [ones], expected: 500049986 },
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
  const output = numOfSubarrays(...args);
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
