# 1. Two Sum

**Difficulty:** Easy · **Topics:** Array, Hash Table · [LeetCode](https://leetcode.com/problems/two-sum/)

**Theory:** [GeeksforGeeks — Hashing](https://www.geeksforgeeks.org/dsa/hashing-data-structure/)

## Problem
You are given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- **Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than `O(n^2)` time complexity?

## Approach
For each number `x`, the partner we need is `target − x`. Checking every pair is O(n²) (up to ~5·10⁷ pairs). Instead, remember every number we have already seen in a hash map `value → index`; then "have I seen the partner?" is an O(1) lookup.

1. Walk through `nums` with index `i`.
2. Compute `need = target − nums[i]`. If `need` is in the map, return `[map[need], i]`.
3. Otherwise store `nums[i] → i` and continue.

Looking up before inserting guarantees we never pair an element with itself, and it still handles duplicates like `[3,3]` because the first `3` is already in the map when we reach the second.

## Walkthrough
`nums = [2,7,11,15]`, `target = 9`

| i | nums[i] | need | map before | Action |
|---|---|---|---|---|
| 0 | 2 | 7 | {} | not found, store 2→0 |
| 1 | 7 | 2 | {2:0} | found at 0 → return `[0,1]` |

## Complexity
- **Time:** O(n) — one pass, each lookup/insert is O(1) on average.
- **Space:** O(n) — the map can hold up to n entries.
