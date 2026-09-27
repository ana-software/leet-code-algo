import { groupAnagrams } from "./solution";

type Case = { input: Parameters<typeof groupAnagrams>; expected: ReturnType<typeof groupAnagrams> };

const cases: Case[] = [
  // Example cases from the problem statement
  { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]] },
  { input: [[""]], expected: [[""]] },
  { input: [["a"]], expected: [["a"]] },
  // Edge: duplicate strings stay in the same group, empty strings group together
  { input: [["", "b", "", "b"]], expected: [["", ""], ["b", "b"]] },
  // Edge: same letters, different counts are not anagrams
  { input: [["aab", "abb", "bab", "aba"]], expected: [["aab", "aba"], ["abb", "bab"]] },
  // Edge: maximum-length strings (100 chars)
  { input: [["a".repeat(50) + "b".repeat(50), "b".repeat(50) + "a".repeat(50), "a".repeat(100)]],
    expected: [["a".repeat(50) + "b".repeat(50), "b".repeat(50) + "a".repeat(50)], ["a".repeat(100)]] },
];

// Groups and strings inside a group may come in any order: sort both levels
const normalize = (x: string[][]) =>
  JSON.stringify(x.map((g) => [...g].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))));

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = groupAnagrams(...args);
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
