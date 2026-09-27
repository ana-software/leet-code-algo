# leet-code-algo

Algorithm problems solved in TypeScript, for interview practice. Each problem has an explanation of the approach, a solution you can paste into LeetCode, and tests that run it like LeetCode's "Run" button. Each explanation links to the [Hello Interview](https://www.hellointerview.com/learn/code) lesson on its pattern. New problems, or whole LeetCode problem lists, are added by a Claude Code agent.

```
problems/
  167. Two Sum II - Input Array Is Sorted/
    README.md          explanation, walkthrough, complexity, theory link
    solution.ts        the solution
    solution.test.ts   runs the examples and edge cases
scripts/run.ts         test runner behind `npm test`
.claude/agents/        the add-algo agent
```

## Running

First time: `npm install`

- `npm test` — run every problem
- `npm test 167` — run one problem by number (or several: `npm test 1 167`)
- In VS Code, with any file of a problem open:
  - **F5** — run that problem's tests (breakpoints work)
  - **Cmd+Shift+P → "Tasks: Run Test Task"** — run it without the debugger

## Adding problems

Ask Claude Code to use the `add-algo` agent (defined in [.claude/agents/add-algo.md](.claude/agents/add-algo.md)) and give it a link:

- **One or more problems** — e.g. "use add-algo for https://leetcode.com/problems/two-sum/". Works with LeetCode, leetcode.cn, NeetCode, Codewars, HackerRank, GeeksforGeeks and other judges.
- **A LeetCode problem list** — e.g. "use add-algo for https://leetcode.com/problem-list/0ev1o401/". Adds only the problems the repo doesn't have yet and skips premium ones.

Each problem gets a `problems/{number}. {Title}` folder with:

- `README.md` — the statement, approach, a walkthrough of Example 1, complexity, and a link to the matching [Hello Interview](https://www.hellointerview.com/learn/code) lesson
- `solution.ts` — the solution, ready to paste into LeetCode
- `solution.test.ts` — runs the examples and edge cases like LeetCode's "Run" button

## Problems

| # | Problem | Difficulty | Pattern |
|---|---|---|---|
| 11 | [Container With Most Water](problems/11.%20Container%20With%20Most%20Water/) | Medium | [Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/overview) |
| 53 | [Maximum Subarray](problems/53.%20Maximum%20Subarray/) | Medium | [Dynamic Programming](https://www.hellointerview.com/learn/code/dynamic-programming/fundamentals) |
| 167 | [Two Sum II - Input Array Is Sorted](problems/167.%20Two%20Sum%20II%20-%20Input%20Array%20Is%20Sorted/) | Medium | [Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/overview) |
| 209 | [Minimum Size Subarray Sum](problems/209.%20Minimum%20Size%20Subarray%20Sum/) | Medium | [Sliding Window (variable size)](https://www.hellointerview.com/learn/code/sliding-window/variable-length) |
| 350 | [Intersection of Two Arrays II](problems/350.%20Intersection%20of%20Two%20Arrays%20II/) | Easy | Hash map counting |
| 485 | [Max Consecutive Ones](problems/485.%20Max%20Consecutive%20Ones/) | Easy | Single pass |
| 560 | [Subarray Sum Equals K](problems/560.%20Subarray%20Sum%20Equals%20K/) | Medium | [Prefix Sum](https://www.hellointerview.com/learn/code/prefix-sum/overview) |
| 643 | [Maximum Average Subarray I](problems/643.%20Maximum%20Average%20Subarray%20I/) | Easy | [Sliding Window (fixed size)](https://www.hellointerview.com/learn/code/sliding-window/fixed-length) |
