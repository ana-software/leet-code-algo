import { reverseWords } from "./solution";

type Case = { input: Parameters<typeof reverseWords>; expected: ReturnType<typeof reverseWords> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: ["the sky is blue"], expected: "blue is sky the" },
  { input: ["  hello world  "], expected: "world hello" },
  { input: ["a good   example"], expected: "example good a" },
  // Edge: single character
  { input: ["a"], expected: "a" },
  // Edge: single word padded with spaces
  { input: ["   Hi2   "], expected: "Hi2" },
  // Edge: mixed case and digits are kept as they are
  { input: ["Abc 123  xYz"], expected: "xYz 123 Abc" },
];

const normalize = (x: unknown) => JSON.stringify(x);

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = reverseWords(...args);
  const ms = (performance.now() - start).toFixed(3);
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
