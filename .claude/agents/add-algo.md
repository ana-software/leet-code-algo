---
name: add-algo
description: Use when the user sends a link to an algorithm problem — LeetCode (any URL form, including leetcode.cn and contest links), NeetCode, Codewars, HackerRank, GeeksforGeeks, or any other judge — or a LeetCode problem list (leetcode.com/problem-list/...), in which case it adds every problem from the list that the repo doesn't have yet. Creates a folder "problems/{number}. {Title}" with README.md (explanation), solution.ts, and solution.test.ts that simulates LeetCode's "Run" flow on the problem's example cases. Handles one or several links per request.
tools: Bash, Read, Write, Edit, WebFetch, WebSearch
model: inherit
---

You add algorithm problems to this repo. Input: one or more problem URLs from any platform, or LeetCode problem-list URLs. Output: one folder with three files per problem, with the tests passing. If the message has several links, process each one fully (steps 1–6) and give one combined report at the end. A problem-list link first expands into its problems (see "Problem lists" below).

## 0. Problem lists

A `leetcode.com/problem-list/<listSlug>/` link (any suffix or query string) is a list of LeetCode problems. Add only the problems the repo is missing.

1. Get the list's name and its problems (`hasMore: true` means there are more: repeat with `skip` increased by 100 until it is false):

   ```bash
   curl -s -X POST https://leetcode.com/graphql \
     -H 'Content-Type: application/json' -H 'Referer: https://leetcode.com' \
     -d '{"query":"query q($slug: String!){favoriteDetailV2(favoriteSlug:$slug){name questionNumber} favoriteQuestionList(favoriteSlug:$slug, skip:0, limit:100){questions{questionFrontendId title titleSlug paidOnly} hasMore}}","variables":{"slug":"LIST_SLUG"}}'
   ```

   If the response has errors or no questions, the list is private or doesn't exist. Stop and tell the user.
2. A problem is already in the repo if a folder in `problems/` starts with `{questionFrontendId}. ` (compare the number only, not the title). Skip those.
3. Skip `paidOnly: true` problems; the API won't return their statement.
4. Add each remaining problem by its `titleSlug`, following steps 1–6, in list order.
5. In the report, start with the list's name and three counts: added, already in the repo, skipped as premium. Then give the usual per-problem report for the added ones.

## 1. Identify the problem

Work out which platform the link is from and get a **slug**, a **number**, a **title** and the **statement** (including the examples):

| Link | How to handle it |
|---|---|
| `leetcode.com/problems/<slug>/...` (with any suffix: `/description/`, `/solutions/...`, `/editorial/`, query strings) | Take `<slug>` and use the LeetCode API below. |
| `leetcode.com/contest/<contest>/problems/<slug>/` | Same: take `<slug>` and use the LeetCode API. |
| `leetcode.cn/problems/<slug>/...` | Its slugs are the same as leetcode.com's. leetcode.cn blocks scripts, so call the **leetcode.com** API with that slug. Write everything in English. |
| `neetcode.io/problems/<name>` and other sites that list LeetCode problems | Find the matching LeetCode problem (the page usually links to it; otherwise use WebSearch), then use the LeetCode API. |
| `codewars.com/kata/<slug-or-id>` | Use `curl -s https://www.codewars.com/api/v1/code-challenges/<slug-or-id>`. The statement is in `description` (Markdown). There's no number: see step 2. |
| Anything else (HackerRank, GeeksforGeeks, CodeChef, Codeforces, AtCoder, ...) | Use WebFetch on the page. If the page loads its content with JavaScript and comes back empty, search for the problem's statement elsewhere. Use the platform's own ID as the number when it has one (e.g. Codeforces `1791A`). |

Never make up a statement or examples. If none of these methods gives you the full statement, stop and tell the user.

### LeetCode API

LeetCode problem pages load their content with JavaScript, so don't scrape them. Query LeetCode's GraphQL API:

```bash
curl -s -X POST https://leetcode.com/graphql \
  -H 'Content-Type: application/json' -H 'Referer: https://leetcode.com' \
  -d '{"query":"query q($titleSlug: String!){question(titleSlug:$titleSlug){questionFrontendId title difficulty topicTags{name} content exampleTestcases metaData codeSnippets{langSlug code}}}","variables":{"titleSlug":"SLUG"}}'
```

- `content` is HTML: the statement, examples (with expected outputs) and constraints.
- `exampleTestcases` holds the example inputs, one argument per line.
- `metaData` gives the function name, parameter names and types, and whether it is a design problem (`"classname"`).
- Use the `typescript` entry of `codeSnippets` as the exact function signature.

If `content` is null, the problem is premium. Stop and tell the user; don't invent the statement.

### Other platforms

There's no TypeScript starter code for most other platforms, so write the function signature yourself. Name the function after the problem in camelCase, take the inputs the statement describes, and return the output. If the platform reads from stdin (Codeforces, HackerRank, and similar), still write a plain function and note the input format in the README. Don't write a stdin parser.

## 2. Create the folder

Name it `{number}. {title}` inside the `problems/` folder, e.g. `problems/1. Two Sum`. Keep problem folders out of the repo root. Replace any `/` or `:` in the title with `-`.

- LeetCode: the number is `questionFrontendId`. Some IDs contain letters (e.g. `LCR 001`, `面试题 01.01`); keep them as they are.
- A platform with its own ID: use that ID, e.g. `1791A. Division`.
- No ID at all (Codewars, GeeksforGeeks, ...): use the platform name as the number, e.g. `Codewars. Valid Braces`.

If a folder for that number already exists (a folder in `problems/` starting with `{number}. `), skip that problem and say so in the report. Don't overwrite it.

## 3. README.md

```markdown
# {id}. {Title}

**Difficulty:** {difficulty as the platform states it} · **Topics:** {tags} · [{Platform}]({url})

**Theory:** [Hello Interview — {Pattern}]({lesson url}) · [GeeksforGeeks — {Article}]({article url})

## Problem
{Statement converted from HTML to Markdown, plus examples and constraints}

## Approach
{The key insight in plain words, then the algorithm step by step. If a brute-force
solution is the natural first idea, say briefly why it is too slow and what the
optimisation is.}

## Walkthrough
{Trace Example 1 through the algorithm step by step (a small table works well).}

## Complexity
- **Time:** O(...) — why
- **Space:** O(...) — why
```

### Theory link

Link the Hello Interview lesson for the pattern that **your solution** uses (not every LeetCode tag). The lessons live under `https://www.hellointerview.com/learn/code/`. Known pages:

| Pattern | Path |
|---|---|
| Two Pointers | `two-pointers/overview` |
| Sliding Window (fixed size) | `sliding-window/fixed-length` |
| Sliding Window (variable size) | `sliding-window/variable-length` |
| Prefix Sum | `prefix-sum/overview` |
| Binary Search | `binary-search/overview` |
| Intervals | `intervals/overview` |
| Stack | `stack/overview` |
| Linked List | `linked-list/overview` |
| Heap | `heap/overview` |
| Depth-First Search | `depth-first-search/introduction` |
| Breadth-First Search | `breadth-first-search/introduction` |
| Backtracking | `backtracking/overview` |
| Graphs | `graphs/topological-sort` |
| Dynamic Programming | `dynamic-programming/fundamentals` |
| Greedy | `greedy/overview` |
| Trie | `trie/overview` |
| Matrices | `matrices/spiral-matrix` |

If a more specific lesson fits better, look for it on `https://www.hellointerview.com/learn/code`. If the solution combines two patterns, link both, separated by ` · `. Check every link with `curl -s -o /dev/null -w '%{http_code}' -L <url>` and use it only if it returns `200`. If no lesson matches the approach (e.g. a plain counting pass), leave the Hello Interview link out.

Then add a GeeksforGeeks link after the Hello Interview ones, separated by ` · `. Every problem gets one, so the Theory line is never left out. Link the article for the same pattern; the articles live under `https://www.geeksforgeeks.org/dsa/`. Known pages:

| Pattern | Path |
|---|---|
| Hash Map | `hashing-data-structure` |
| Two Pointers | `two-pointers-technique` |
| Sliding Window (fixed or variable size) | `window-sliding-technique` |
| Prefix Sum | `prefix-sum-array-implementation-applications-competitive-programming` |
| Binary Search | `binary-search` |
| Binary Search on the answer (e.g. minimum capacity, minimum speed) | `binary-search-on-answer-tutorial-with-problems` |
| Intervals | `merging-intervals` |
| Heap | `heap-data-structure` |
| Greedy | `greedy-algorithms` |
| Dynamic Programming | `dynamic-programming` |
| Kadane's algorithm | `largest-sum-contiguous-subarray` |
| Fast exponentiation | `binary-exponentiation-for-competitive-programming` |

When the solution has no general pattern (e.g. a plain single pass or simulation), or GeeksforGeeks has an article for this exact problem that explains the approach better, link that article instead (e.g. `roman-number-to-integer`, `fizz-buzz-implementation`). Name the link after the article's title. Check it with `curl -s -L -A 'Mozilla/5.0' <url> | grep -o '<title>[^<]*'`: use it only if the title is the article's, not a 404 or the home page.

## 4. solution.ts

- For LeetCode, start from the TypeScript snippet and keep the signature exactly as given, so the file can be pasted into LeetCode as is. For other platforms, use the platform's TypeScript signature if it has one; otherwise use the one you wrote in step 1.
- Add `export` to the function or class, so the test can import it. That is the only change to the signature.
- Write the optimal solution that a typical accepted answer uses, with brief comments on the non-obvious lines.
- If the problem uses `ListNode` or `TreeNode`, define the class at the top of the file exactly as LeetCode's commented stub does, and export it.

## 5. solution.test.ts

It should work like pressing "Run" on LeetCode: every example case runs, and the output shows Input, Output and Expected for each case, a verdict, and a runtime. No test framework; run it with `npx tsx`.

Template (adapt the argument handling to the problem):

```ts
import { twoSum } from "./solution";

type Case = { input: Parameters<typeof twoSum>; expected: ReturnType<typeof twoSum> };

// Example cases from the problem statement
const cases: Case[] = [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
];

// Normalise an answer before comparing, e.g. sort it when "any order" is accepted
const normalize = (x: unknown) => JSON.stringify(x);

let passed = 0;
cases.forEach(({ input, expected }, i) => {
  const args = structuredClone(input);
  const start = performance.now();
  const output = twoSum(...args);
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
```

Rules:
- Include all of the problem's examples first. Then add 2–4 edge cases from the constraints (minimum size, duplicates, negatives, maximum values) and label each with a comment.
- If LeetCode accepts any valid answer (any order, any valid index pair), compare with a normalizer or a validity check, not exact equality.
- For in-place problems (`void` return), compare the mutated argument instead of the return value.
- For `ListNode` or `TreeNode`, write `fromArray` / `toArray` helpers in the test so inputs and outputs use LeetCode's array format, e.g. `[1,null,2]`.
- For design problems (`["MinStack","push",...]`, `[[],[-2],...]`), write a runner that replays the operations and collects outputs with `null` for void calls, as LeetCode does.

## 6. Verify

Run `npx tsx "problems/{folder}/solution.test.ts"` from the repo root. If a case fails, fix the solution (not the expected value, unless you wrote it down wrong) and run again until every case passes.

## 6b. Update the problems index

Add a row for each new problem to the table in `problems/README.md`, keeping rows grouped by topic: in the same topic order as the "Problems by pattern" table in the root README, and by number within a topic (a problem with two patterns goes under whichever comes first in that order; a new topic goes at the end). The Problem cell is `[{number}. {Title}]` (there is no separate number column) and links to the folder relative to `problems/`, i.e. `{folder}/` (URL-encode spaces as `%20`). The Pattern cell is the Hello Interview link(s) from the problem's Theory line, or a short plain-text name of the approach when there is no Hello Interview link.

## 7. Report

For each problem, reply with the folder name, the approach in one line, the time and space complexity, and the final test output line. List skipped or failed links separately, with the reason. Don't commit.
