import { lengthOfLongestSubstring } from "./solution";

type Case = { input: Parameters<typeof lengthOfLongestSubstring>; expected: ReturnType<typeof lengthOfLongestSubstring> };

// Max-size input: 10^5 characters cycling through all 95 printable ASCII chars
const big = Array.from({ length: 100000 }, (_, i) => String.fromCharCode(32 + (i % 95))).join("");

const cases: Case[] = [
  // Example cases from the problem statement
  { input: ["abcabcbb"], expected: 3 },
  { input: ["bbbbb"], expected: 1 },
  { input: ["pwwkew"], expected: 3 },
  // Edge: empty string
  { input: [""], expected: 0 },
  // Edge: spaces and symbols count as characters
  { input: [" !a b"], expected: 4 },
  // Edge: duplicate seen before the window must not move left backwards
  { input: ["abba"], expected: 2 },
  // Edge: maximum length, every 95-char window is duplicate-free
  { input: [big], expected: 95 },
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
  const output = lengthOfLongestSubstring(...args);
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
