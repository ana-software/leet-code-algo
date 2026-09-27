# 1524. Number of Sub-arrays With Odd Sum

**Difficulty:** Medium · **Topics:** Array, Math, Dynamic Programming, Prefix Sum · [LeetCode](https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/)

**Theory:** [Hello Interview — Prefix Sum](https://www.hellointerview.com/learn/code/prefix-sum/overview) · [GeeksforGeeks — Prefix Sum](https://www.geeksforgeeks.org/dsa/prefix-sum-array-implementation-applications-competitive-programming/)

## Problem
Given an array of integers `arr`, return *the number of subarrays with an **odd** sum*.

Since the answer can be very large, return it modulo `10^9 + 7`.

**Example 1:**
```
Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].
Odd sums are [1,9,3,5] so the answer is 4.
```

**Example 2:**
```
Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].
All sub-arrays have even sum and the answer is 0.
```

**Example 3:**
```
Input: arr = [1,2,3,4,5,6,7]
Output: 16
```

**Constraints:**
- `1 <= arr.length <= 10^5`
- `1 <= arr[i] <= 100`

## Approach
Summing every subarray is O(n²), about 5 · 10⁹ subarrays at n = 10⁵ — too slow.

> [!IMPORTANT]
> **Key insight: a subarray sum is odd exactly when its two prefix sums have different parity, so just count even and odd prefixes.**
>
> The sum of `arr[i+1..j]` is `prefix[j] − prefix[i]`, and a difference is odd exactly when the two prefix sums have **different parity**. So we don't need the prefix sums themselves, only how many earlier prefixes were even and how many were odd.

1. Keep `even = 1` (the empty prefix, sum 0) and `odd = 0`, and a running `prefix` sum.
2. For each element, add it to `prefix`.
   - If `prefix` is odd, every earlier even prefix gives an odd subarray ending here: add `even` to the answer, then increment `odd`.
   - If `prefix` is even, add `odd` to the answer, then increment `even`.
3. Take the answer modulo `10^9 + 7` as you go and return it.

Only the parity of `prefix` matters, so it can be stored as 0/1 and never overflows.

## Walkthrough
`arr = [1,3,5]`

| i | arr[i] | prefix | parity | add to answer | answer | even | odd |
|---|---|---|---|---|---|---|---|
| — | — | 0 | even | — | 0 | 1 | 0 |
| 0 | 1 | 1 | odd | even = 1 | 1 | 1 | 1 |
| 1 | 3 | 4 | even | odd = 1 | 2 | 2 | 1 |
| 2 | 5 | 9 | odd | even = 2 | 4 | 2 | 2 |

Result: `4`.

## Complexity
- **Time:** O(n) — one pass.
- **Space:** O(1) — two counters and the running parity.
