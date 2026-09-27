import { TopVotedCandidate } from "./solution";

type Case = { ops: string[]; args: unknown[][]; expected: (number | null)[] };

// Max-size input: 5000 votes alternating between persons 0 and 1 at times 0, 1, ..., 4999,
// then 10^4 queries. After vote t, the leader is whoever just voted (a tie goes to the latest).
const persons = Array.from({ length: 5000 }, (_, i) => i % 2);
const times = Array.from({ length: 5000 }, (_, i) => i);
const bigOps = ["TopVotedCandidate"];
const bigArgs: unknown[][] = [[persons, times]];
const bigExpected: (number | null)[] = [null];
for (let i = 0; i < 10000; i++) {
  const t = i < 5000 ? i : 1000000000; // late queries see every vote
  bigOps.push("q");
  bigArgs.push([t]);
  bigExpected.push(i < 5000 ? i % 2 : 1);
}

const cases: Case[] = [
  // Example case from the problem statement
  {
    ops: ["TopVotedCandidate", "q", "q", "q", "q", "q", "q"],
    args: [[[0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]], [3], [12], [25], [15], [24], [8]],
    expected: [null, 0, 1, 1, 0, 0, 1],
  },
  // Edge: a single vote, queried at its time and much later
  {
    ops: ["TopVotedCandidate", "q", "q"],
    args: [[[0], [7]], [7], [1000000000]],
    expected: [null, 0, 0],
  },
  // Edge: tie broken by the most recent vote; a query exactly at a vote time counts that vote
  {
    ops: ["TopVotedCandidate", "q", "q", "q", "q"],
    args: [[[2, 1, 1, 2], [1, 2, 3, 4]], [1], [2], [3], [4]],
    expected: [null, 2, 1, 1, 2],
  },
  // Edge: maximum votes and queries
  { ops: bigOps, args: bigArgs, expected: bigExpected },
];

// Replay the operations like LeetCode does: null for the constructor
const run = (ops: string[], args: unknown[][]): (number | null)[] => {
  let obj: TopVotedCandidate | null = null;
  return ops.map((op, i) => {
    if (op === "TopVotedCandidate") {
      const [p, t] = args[i] as [number[], number[]];
      obj = new TopVotedCandidate(p, t);
      return null;
    }
    return obj!.q(args[i][0] as number);
  });
};

const normalize = (x: unknown) => JSON.stringify(x);

// Shorten huge inputs so the console output stays readable
const show = (a: unknown) => {
  const s = JSON.stringify(a);
  return s.length > 80 ? `${s.slice(0, 77)}...` : s;
};

let passed = 0;
cases.forEach(({ ops, args, expected }, i) => {
  const start = performance.now();
  const output = run(ops, structuredClone(args));
  const ms = (performance.now() - start).toFixed(3);
  const ok = normalize(output) === normalize(expected);
  if (ok) passed++;
  console.log(`Case ${i + 1}: ${ok ? "✅ Accepted" : "❌ Wrong Answer"} (${ms} ms)`);
  console.log(`  Input:    ${show(ops)}, ${show(args)}`);
  console.log(`  Output:   ${show(output)}`);
  console.log(`  Expected: ${show(expected)}\n`);
});

console.log(passed === cases.length ? `✅ Accepted — ${passed}/${cases.length} cases passed`
                                     : `❌ Wrong Answer — ${passed}/${cases.length} cases passed`);
process.exit(passed === cases.length ? 0 : 1);
