import { isAnagram } from "./solution";

type Case = { input: Parameters<typeof isAnagram>; expected: ReturnType<typeof isAnagram> };

// Max-size input: 5*10^4 letters, t is s reversed
const big = Array.from({ length: 50000 }, (_, i) => String.fromCharCode(97 + (i % 26))).join("");

const cases: Case[] = [
  // Example cases from the problem statement
  { input: ["anagram", "nagaram"], expected: true },
  { input: ["rat", "car"], expected: false },
  // Edge: different lengths
  { input: ["a", "ab"], expected: false },
  // Edge: same letters, different counts
  { input: ["aab", "abb"], expected: false },
  // Edge: minimum length, identical
  { input: ["z", "z"], expected: true },
  // Edge: maximum length
  { input: [big, [...big].reverse().join("")], expected: true },
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
  const output = isAnagram(...args);
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
