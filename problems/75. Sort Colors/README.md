# 75. Sort Colors

**Difficulty:** Medium · **Topics:** Array, Two Pointers, Sorting, Quicksort, Bubble Sort · [LeetCode](https://leetcode.com/problems/sort-colors/)

**Theory:** [Hello Interview — Two Pointers (Sort Colors)](https://www.hellointerview.com/learn/code/two-pointers/sort-colors)

## Problem
You are given an array `nums` with `n` objects colored red, white, or blue, sort them **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

**Example 1:**
```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Explanation: The array has two 0s, two 1s, and two 2s. Sorting them in-place places all 0s first, then all 1s, then all 2s.
```

**Example 2:**
```
Input: nums = [2,0,1]
Output: [0,1,2]
Explanation: The array has one each of 0, 1, and 2, arranged in-place in the order 0, 1, 2.
```

**Constraints:**
- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` is either 0, 1, or 2.

**Follow up:** Could you come up with a one-pass algorithm using only constant extra space?

## Approach
Counting the 0s, 1s and 2s and rewriting the array works but takes two passes. The one-pass answer is Dijkstra's **Dutch National Flag** partition with three pointers:

- `[0, low)` holds 0s, `[low, mid)` holds 1s, `(high, n−1]` holds 2s, and `[mid, high]` is still unknown.

While `mid <= high`, look at `nums[mid]`:
1. `0` → swap with `nums[low]`, advance both `low` and `mid` (the swapped-in value is a known 1, or the same 0).
2. `1` → already in place, advance `mid`.
3. `2` → swap with `nums[high]`, decrement `high`, but **don't** advance `mid`: the value swapped in from the right is unexamined.

## Walkthrough
`nums = [2,0,2,1,1,0]`

| low | mid | high | nums[mid] | Action | nums after |
|---|---|---|---|---|---|
| 0 | 0 | 5 | 2 | swap mid↔high, high-- | [0,0,2,1,1,2] |
| 0 | 0 | 4 | 0 | swap low↔mid, low++, mid++ | [0,0,2,1,1,2] |
| 1 | 1 | 4 | 0 | swap low↔mid, low++, mid++ | [0,0,2,1,1,2] |
| 2 | 2 | 4 | 2 | swap mid↔high, high-- | [0,0,1,1,2,2] |
| 2 | 2 | 3 | 1 | mid++ | [0,0,1,1,2,2] |
| 2 | 3 | 3 | 1 | mid++ | [0,0,1,1,2,2] |

`mid > high`, stop. Result: `[0,0,1,1,2,2]`.

## Complexity
- **Time:** O(n) — each step either advances `mid` or shrinks `high`.
- **Space:** O(1) — three indices, sorting in place.
