import { romanToInt } from "./solution";

type Case = { input: Parameters<typeof romanToInt>; expected: ReturnType<typeof romanToInt> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: ["III"], expected: 3 },
  { input: ["LVIII"], expected: 58 },
  { input: ["MCMXCIV"], expected: 1994 },
  // Edge: minimum value, single symbol
  { input: ["I"], expected: 1 },
  // Edge: maximum value 3999
  { input: ["MMMCMXCIX"], expected: 3999 },
  // Edge: maximum length (15 symbols) = 3888
  { input: ["MMMDCCCLXXXVIII"], expected: 3888 },
  // Edge: every subtraction pair
  { input: ["CDXLIV"], expected: 444 },
];

const normalize = (x: unknown) => JSON.stringify(x);

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = romanToInt(...args);
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
