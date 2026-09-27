# 209. Minimum Size Subarray Sum

**Difficulty:** Medium · **Topics:** Array, Binary Search, Sliding Window, Prefix Sum · [LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/)

**Theory:** [Hello Interview — Sliding Window (variable size)](https://www.hellointerview.com/learn/code/sliding-window/variable-length)

## Problem
Given an array of positive integers `nums` and a positive integer `target`, return *the **minimal length** of a subarray whose sum is greater than or equal to* `target`. If there is no such subarray, return `0` instead.

(A subarray is a contiguous **non-empty** sequence of elements within an array.)

**Example 1:**
```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
```

**Example 2:**
```
Input: target = 4, nums = [1,4,4]
Output: 1
```

**Example 3:**
```
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
```

**Constraints:**
- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

**Follow up:** If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.

## Approach
Checking every subarray is O(n²) — too slow for 10⁵ elements.

Key insight: all numbers are **positive**, so growing a window only increases its sum and shrinking it only decreases it. That makes a variable-size sliding window work:

1. Move `right` across the array, adding `nums[right]` to `sum`.
2. While `sum >= target`, the window `[left, right]` is valid: record its length, then remove `nums[left]` and move `left` right to try a shorter window.
3. If no window was ever valid, return `0`; otherwise return the shortest length.

Once a window starting at `left` is valid, there's no point extending it further right (it would only be longer), so moving `left` forward never skips a better answer. Each index enters and leaves the window at most once.

(Follow-up O(n log n): build prefix sums, which are strictly increasing, and for each start `i` binary-search the first `j` with `prefix[j] − prefix[i] >= target`.)

## Walkthrough
`target = 7`, `nums = [2,3,1,2,4,3]`

| right | nums[right] | sum after add | Shrinking (window → length, then remove left) | best |
|---|---|---|---|---|
| 0 | 2 | 2 | — | ∞ |
| 1 | 3 | 5 | — | ∞ |
| 2 | 1 | 6 | — | ∞ |
| 3 | 2 | 8 | [0..3] → 4, remove 2 → sum 6 | 4 |
| 4 | 4 | 10 | [1..4] → 4, remove 3 → 7; [2..4] → 3, remove 1 → 6 | 3 |
| 5 | 3 | 9 | [3..5] → 3, remove 2 → 7; [4..5] → 2, remove 4 → 3 | 2 |

Result: `2` (the subarray `[4,3]`).

## Complexity
- **Time:** O(n) — `left` and `right` each move at most n times.
- **Space:** O(1) — a few variables.
