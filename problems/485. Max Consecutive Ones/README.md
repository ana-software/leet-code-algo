# 485. Max Consecutive Ones

**Difficulty:** Easy · **Topics:** Array · [LeetCode](https://leetcode.com/problems/max-consecutive-ones/)

## Problem
Given a binary array `nums`, return *the maximum number of consecutive* `1`*'s in the array*.

**Example 1:**
```
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
```

**Example 2:**
```
Input: nums = [1,0,1,1,0,1]
Output: 2
```

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Approach
Scan once, keeping the length of the current run of 1s:

1. `cur = 0`, `best = 0`.
2. For each element: if it is `1`, increment `cur` and update `best = max(best, cur)`; if it is `0`, the run is broken, so reset `cur = 0`.
3. Return `best`.

Updating `best` on every `1` (rather than only when a `0` appears) means a run that reaches the end of the array is counted without a special case.

## Walkthrough
`nums = [1,1,0,1,1,1]`

| i | nums[i] | cur | best |
|---|---|---|---|
| 0 | 1 | 1 | 1 |
| 1 | 1 | 2 | 2 |
| 2 | 0 | 0 | 2 |
| 3 | 1 | 1 | 2 |
| 4 | 1 | 2 | 2 |
| 5 | 1 | 3 | 3 |

Result: `3`.

## Complexity
- **Time:** O(n) — one pass over the array.
- **Space:** O(1) — two counters.
