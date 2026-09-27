# 525. Contiguous Array

**Difficulty:** Medium · **Topics:** Array, Hash Table, Prefix Sum · [LeetCode](https://leetcode.com/problems/contiguous-array/)

**Theory:** [Hello Interview — Prefix Sum](https://www.hellointerview.com/learn/code/prefix-sum/overview) · [GeeksforGeeks — Prefix Sum](https://www.geeksforgeeks.org/dsa/prefix-sum-array-implementation-applications-competitive-programming/)

## Problem
Given a binary array `nums`, return *the maximum length of a contiguous subarray with an equal number of* `0` *and* `1`.

**Example 1:**
```
Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
```

**Example 2:**
```
Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
```

**Example 3:**
```
Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
```

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Approach
Checking every subarray is O(n²), about 5 · 10⁹ pairs at n = 10⁵ — too slow. A sliding window doesn't work either, because there's no rule for when to shrink it.

> [!IMPORTANT]
> **Key insight: treat 0 as −1; a balanced subarray is one where the running sum repeats, so remember where each sum first appeared.**
>
> Count a `1` as `+1` and a `0` as `−1`. A subarray has equal 0s and 1s exactly when its sum is 0, which means the running sum (`balance`) is **the same** at both ends. So for every index, the longest balanced subarray ending there starts right after the **first** index where the same balance appeared.

1. Keep a map `balance → first index where it appeared`, starting with `{0: -1}` (the empty prefix, so subarrays starting at index 0 are counted).
2. For each index `i`, update `balance` by `+1` or `−1`.
   - If `balance` was seen before at index `first`, the subarray `first+1..i` is balanced: update the best length with `i − first`.
   - Otherwise, store `i` as the first index for this balance. Never overwrite it: the earliest index gives the longest subarray.
3. Return the best length.

## Walkthrough
`nums = [0,1]`

| i | nums[i] | balance | first index of balance | length | best | map after |
|---|---|---|---|---|---|---|
| — | — | 0 | — | — | 0 | {0:-1} |
| 0 | 0 | -1 | not seen | — | 0 | {0:-1, -1:0} |
| 1 | 1 | 0 | -1 | 1 − (−1) = 2 | 2 | {0:-1, -1:0} |

Result: `2`.

## Complexity
- **Time:** O(n) — one pass with O(1) map operations.
- **Space:** O(n) — up to n + 1 distinct balances in the map.
