import { MyCalendar } from "./solution";

type Case = { ops: string[]; args: number[][]; expected: (boolean | null)[] };

// Max-size input: 1000 book calls. Even calls book [2i, 2i+1); odd calls try to
// overlap the previous booking and fail.
const bigOps = ["MyCalendar"];
const bigArgs: number[][] = [[]];
const bigExpected: (boolean | null)[] = [null];
for (let i = 0; i < 500; i++) {
  const s = 1000000000 - 2 * (i + 1); // book from the top down, near the 10^9 limit
  bigOps.push("book", "book");
  bigArgs.push([s, s + 1], [s, s + 2]);
  bigExpected.push(true, false);
}

const cases: Case[] = [
  // Example case from the problem statement
  {
    ops: ["MyCalendar", "book", "book", "book"],
    args: [[], [10, 20], [15, 25], [20, 30]],
    expected: [null, true, false, true],
  },
  // Edge: a new event that ends exactly where an existing one starts (half-open, so OK)
  {
    ops: ["MyCalendar", "book", "book", "book"],
    args: [[], [20, 30], [10, 20], [30, 40]],
    expected: [null, true, true, true],
  },
  // Edge: new event fully covers an existing one / sits fully inside one
  {
    ops: ["MyCalendar", "book", "book", "book", "book"],
    args: [[], [10, 20], [5, 25], [12, 15], [0, 10]],
    expected: [null, true, false, false, true],
  },
  // Edge: the extremes 0 and 10^9, plus a gap that fits exactly
  {
    ops: ["MyCalendar", "book", "book", "book", "book"],
    args: [[], [0, 1], [999999999, 1000000000], [1, 999999999], [0, 1000000000]],
    expected: [null, true, true, true, false],
  },
  // Edge: maximum number of calls (1000)
  { ops: bigOps, args: bigArgs, expected: bigExpected },
];

// Replay the operations like LeetCode does: null for the constructor
const run = (ops: string[], args: number[][]): (boolean | null)[] => {
  let cal: MyCalendar | null = null;
  return ops.map((op, i) => {
    if (op === "MyCalendar") {
      cal = new MyCalendar();
      return null;
    }
    const [s, e] = args[i];
    return cal!.book(s, e);
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
