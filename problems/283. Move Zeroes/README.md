# 283. Move Zeroes

**Difficulty:** Easy · **Topics:** Array, Two Pointers · [LeetCode](https://leetcode.com/problems/move-zeroes/)

**Theory:** [Hello Interview — Two Pointers (Move Zeroes)](https://www.hellointerview.com/learn/code/two-pointers/move-zeroes) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note** that you must do this in-place without making a copy of the array.

**Example 1:**
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

**Example 2:**
```
Input: nums = [0]
Output: [0]
```

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

**Follow up:** Could you minimize the total number of operations done?

## Approach
> [!IMPORTANT]
> **Key insight: swap each non-zero to the write pointer; the zeros get pushed behind.**
>
> Use two pointers moving in the same direction: `write` marks where the next non-zero element belongs, and `read` scans the array.

1. `write = 0`.
2. For each `read` from `0` to `n − 1`: if `nums[read] != 0`, swap `nums[read]` with `nums[write]` and advance `write`.
3. Everything before `write` is now the non-zeros in original order; the swaps have pushed the zeros behind them.

Swapping (instead of copying non-zeros forward and then filling zeros) finishes in one pass and does no writes at all when the array contains no zeros, which answers the follow-up.

## Walkthrough
`nums = [0,1,0,3,12]`

| read | nums[read] | Action | nums after | write |
|---|---|---|---|---|
| 0 | 0 | skip | [0,1,0,3,12] | 0 |
| 1 | 1 | swap 0↔1 | [1,0,0,3,12] | 1 |
| 2 | 0 | skip | [1,0,0,3,12] | 1 |
| 3 | 3 | swap 1↔3 | [1,3,0,0,12] | 2 |
| 4 | 12 | swap 2↔4 | [1,3,12,0,0] | 3 |

Result: `[1,3,12,0,0]`.

## Complexity
- **Time:** O(n) — a single pass.
- **Space:** O(1) — in place, two indices.
