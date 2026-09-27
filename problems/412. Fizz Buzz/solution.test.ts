import { fizzBuzz } from "./solution";

type Case = { input: Parameters<typeof fizzBuzz>; expected: ReturnType<typeof fizzBuzz> };

// Independent reference used to build the expected output for large n
const reference = (n: number) =>
  Array.from({ length: n }, (_, k) => {
    const i = k + 1;
    return i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : String(i);
  });

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [3], expected: ["1", "2", "Fizz"] },
  { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
  { input: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] },
  // Edge: minimum n
  { input: [1], expected: ["1"] },
  // Edge: maximum n (10^4 is divisible by 5, so the last entry is "Buzz")
  { input: [10000], expected: reference(10000) },
];

const normalize = (x: unknown) => JSON.stringify(x);

// Shorten huge outputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = fizzBuzz(...args);
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
