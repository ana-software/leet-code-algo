import { lengthOfLastWord } from "./solution";

type Case = { input: Parameters<typeof lengthOfLastWord>; expected: ReturnType<typeof lengthOfLastWord> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: ["Hello World"], expected: 5 },
  { input: ["   fly me   to   the moon  "], expected: 4 },
  { input: ["luffy is still joyboy"], expected: 6 },
  // Edge: minimum length, single letter
  { input: ["a"], expected: 1 },
  // Edge: one word surrounded by spaces
  { input: ["  day  "], expected: 3 },
  // Edge: maximum length, a single 10^4-letter word
  { input: ["x".repeat(10000)], expected: 10000 },
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
  const output = lengthOfLastWord(...args);
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
