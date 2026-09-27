# 911. Online Election

**Difficulty:** Medium · **Topics:** Array, Hash Table, Binary Search, Design · [LeetCode](https://leetcode.com/problems/online-election/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/)

## Problem
You are given two integer arrays `persons` and `times`. In an election, the `i`th vote was cast for `persons[i]` at time `times[i]`.

For each query at a time `t`, find the person that was leading the election at time `t`. Votes cast at time `t` will count towards our query. In the case of a tie, the most recent vote (among tied candidates) wins.

Implement the `TopVotedCandidate` class:

- `TopVotedCandidate(int[] persons, int[] times)` Initializes the object with the `persons` and `times` arrays.
- `int q(int t)` Returns the number of the person that was leading the election at time `t` according to the mentioned rules.

**Example 1:**
```
Input
["TopVotedCandidate", "q", "q", "q", "q", "q", "q"]
[[[0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]], [3], [12], [25], [15], [24], [8]]
Output
[null, 0, 1, 1, 0, 0, 1]

Explanation
TopVotedCandidate topVotedCandidate = new TopVotedCandidate([0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]);
topVotedCandidate.q(3); // return 0, At time 3, the votes are [0], and 0 is leading.
topVotedCandidate.q(12); // return 1, At time 12, the votes are [0,1,1], and 1 is leading.
topVotedCandidate.q(25); // return 1, At time 25, the votes are [0,1,1,0,0,1], and 1 is leading (as ties go to the most recent vote.)
topVotedCandidate.q(15); // return 0
topVotedCandidate.q(24); // return 0
topVotedCandidate.q(8); // return 1
```

**Constraints:**
- `1 <= persons.length <= 5000`
- `times.length == persons.length`
- `0 <= persons[i] < persons.length`
- `0 <= times[i] <= 10^9`
- `times` is sorted in a strictly increasing order.
- `times[0] <= t <= 10^9`
- At most `10^4` calls will be made to `q`.

## Approach
Recounting the votes for every query costs O(n) per query. That works for these limits, but it repeats the same work every time.

> [!IMPORTANT]
> **Key insight: precompute the leader after every vote; each query is then a binary search on time.**
>
> The leader only changes when a vote is cast, so there are only `n` possible answers. Compute them all once, then each query is a lookup.

1. **Constructor:** go through the votes in order, keeping a count per person and the current leader. After vote `i`, if the voted person's count is `>=` the best count, they become the leader. Using `>=` (not `>`) makes a tie go to the most recent vote. Store `leaders[i]`.
2. **`q(t)`:** binary search `times` for the **last index `i` with `times[i] <= t`** (votes at exactly `t` count) and return `leaders[i]`. Since `t >= times[0]`, such an index always exists.

## Walkthrough
`persons = [0,1,1,0,0,1,0]`, `times = [0,5,10,15,20,25,30]`

Building `leaders`:

| i | time | vote | counts (0 / 1) | leader |
|---|---|---|---|---|
| 0 | 0 | 0 | 1 / 0 | 0 |
| 1 | 5 | 1 | 1 / 1 | 1 (tie, most recent) |
| 2 | 10 | 1 | 1 / 2 | 1 |
| 3 | 15 | 0 | 2 / 2 | 0 (tie, most recent) |
| 4 | 20 | 0 | 3 / 2 | 0 |
| 5 | 25 | 1 | 3 / 3 | 1 (tie, most recent) |
| 6 | 30 | 0 | 4 / 3 | 0 |

Queries:

| q(t) | last i with times[i] ≤ t | leaders[i] |
|---|---|---|
| 3 | 0 | 0 |
| 12 | 2 | 1 |
| 25 | 5 | 1 |
| 15 | 3 | 0 |
| 24 | 4 | 0 |
| 8 | 1 | 1 |

Output: `[null, 0, 1, 1, 0, 0, 1]`

## Complexity
- **Time:** O(n) for the constructor, O(log n) per query.
- **Space:** O(n) — the `leaders` array and the vote counts.
