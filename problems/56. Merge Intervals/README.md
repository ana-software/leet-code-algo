# 56. Merge Intervals

**Difficulty:** Medium · **Topics:** Array, Sorting, Quicksort · [LeetCode](https://leetcode.com/problems/merge-intervals/)

**Theory:** [Hello Interview — Intervals (Merge Intervals)](https://www.hellointerview.com/learn/code/intervals/merge-intervals) · [GeeksforGeeks — Overlapping Intervals](https://www.geeksforgeeks.org/dsa/merging-intervals/)

## Problem
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.

**Example 1:**
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

**Example 2:**
```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Example 3:**
```
Input: intervals = [[4,7],[1,4]]
Output: [[1,7]]
Explanation: Intervals [1,4] and [4,7] are considered overlapping.
```

**Constraints:**
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

## Approach
Comparing every pair of intervals is O(n²) and merges can cascade. After **sorting by start**, any interval that overlaps the current merged block must come right after it, so a single scan suffices.

1. Sort intervals by start.
2. Push the first interval to `result`.
3. For each next interval `[s, e]`: if `s <= last.end` (touching counts), extend `last.end = max(last.end, e)`; otherwise push `[s, e]` as a new block.

## Walkthrough
`intervals = [[1,3],[2,6],[8,10],[15,18]]` (already sorted)

| Interval | last block | Overlap? | result |
|---|---|---|---|
| [1,3] | — | — | [[1,3]] |
| [2,6] | [1,3] | 2 ≤ 3 yes | [[1,6]] |
| [8,10] | [1,6] | 8 > 6 no | [[1,6],[8,10]] |
| [15,18] | [8,10] | 15 > 10 no | [[1,6],[8,10],[15,18]] |

## Complexity
- **Time:** O(n log n) — the sort dominates; the scan is O(n).
- **Space:** O(n) — the output (plus O(log n) for the sort).
