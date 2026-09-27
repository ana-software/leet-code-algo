# 560. Subarray Sum Equals K

**Difficulty:** Medium · **Topics:** Array, Hash Table, Prefix Sum · [LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/)

**Theory:** [Hello Interview — Prefix Sum](https://www.hellointerview.com/learn/code/prefix-sum/overview) · [GeeksforGeeks — Prefix Sum](https://www.geeksforgeeks.org/dsa/prefix-sum-array-implementation-applications-competitive-programming/)

## Problem
Given an array of integers `nums` and an integer `k`, return *the total number of subarrays whose sum equals to* `k`.

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Example 1:**
```
Input: nums = [1,1,1], k = 2
Output: 2
```

**Example 2:**
```
Input: nums = [1,2,3], k = 3
Output: 2
```

**Constraints:**
- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Approach
Checking every subarray is O(n²), about 2 · 10⁸ operations at the limit — too slow. A sliding window doesn't work either, because values can be **negative**, so growing a window doesn't always increase its sum.

> [!IMPORTANT]
> **Key insight: the subarrays ending here with sum `k` are the earlier prefix sums equal to `prefix − k`, so count them in a hash map.**
>
> Let `prefix` be the sum of `nums[0..j]`. A subarray `nums[i+1..j]` sums to `k` exactly when an earlier prefix sum equals `prefix − k`. So the number of subarrays ending at `j` with sum `k` equals the number of earlier prefixes with value `prefix − k`.

1. Keep a map `prefix sum → how many times it has appeared`, starting with `{0: 1}` (the empty prefix, so subarrays starting at index 0 are counted).
2. For each element: add it to `prefix`, add `seen[prefix − k]` to the answer, then record `prefix` in the map.
3. Return the answer.

Looking up before recording the current prefix makes sure every counted subarray is non-empty.

## Walkthrough
`nums = [1,1,1]`, `k = 2`

| i | nums[i] | prefix | prefix − k | seen[prefix − k] | count | seen after |
|---|---|---|---|---|---|---|
| — | — | 0 | — | — | 0 | {0:1} |
| 0 | 1 | 1 | -1 | 0 | 0 | {0:1, 1:1} |
| 1 | 1 | 2 | 0 | 1 | 1 | {0:1, 1:1, 2:1} |
| 2 | 1 | 3 | 1 | 1 | 2 | {0:1, 1:1, 2:1, 3:1} |

Result: `2` (subarrays `[1,1]` at indices 0–1 and 1–2).

## Complexity
- **Time:** O(n) — one pass with O(1) map operations.
- **Space:** O(n) — up to n + 1 distinct prefix sums in the map.
