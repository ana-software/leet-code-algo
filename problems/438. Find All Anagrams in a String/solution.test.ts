import { findAnagrams } from "./solution";

type Case = { input: Parameters<typeof findAnagrams>; expected: ReturnType<typeof findAnagrams> };

// Max-size input: 3*10^4 'a's, every window of "aa" matches
const big = "a".repeat(30000);

const cases: Case[] = [
  // Example cases from the problem statement
  { input: ["cbaebabacd", "abc"], expected: [0, 6] },
  { input: ["abab", "ab"], expected: [0, 1, 2] },
  // Edge: p longer than s
  { input: ["a", "ab"], expected: [] },
  // Edge: single characters, equal
  { input: ["a", "a"], expected: [0] },
  // Edge: duplicates in p must match exact counts
  { input: ["aabaa", "aab"], expected: [0, 1, 2] },
  // Edge: maximum length, every start index 0..29998 matches
  { input: [big, "aa"], expected: Array.from({ length: 29999 }, (_, i) => i) },
];

// "Any order" is accepted, so compare sorted indices
const normalize = (x: number[]) => JSON.stringify([...x].sort((a, b) => a - b));

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = findAnagrams(...args);
  const ms = (performance.now() - start).toFixed(3);
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
