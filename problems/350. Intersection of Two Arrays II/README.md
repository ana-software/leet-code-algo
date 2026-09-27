# 350. Intersection of Two Arrays II

**Difficulty:** Easy · **Topics:** Array, Hash Table, Two Pointers, Binary Search, Sorting · [LeetCode](https://leetcode.com/problems/intersection-of-two-arrays-ii/)

**Theory:** [GeeksforGeeks — Hashing](https://www.geeksforgeeks.org/dsa/hashing-data-structure/) · [Structy — Intersection](https://structy.net/problems/intersection)

## Problem
Given two integer arrays `nums1` and `nums2`, return *an array of their intersection*. Each element in the result must appear as many times as it shows in both arrays and you may return the result in **any order**.

**Example 1:**
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
```

**Example 2:**
```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.
```

**Constraints:**
- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

**Follow up:**
- What if the given array is already sorted? How would you optimize your algorithm?
- What if `nums1`'s size is small compared to `nums2`'s size? Which algorithm is better?
- What if elements of `nums2` are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

## Approach
Each value `v` should appear `min(count1(v), count2(v))` times in the answer. The brute-force idea — for each element of `nums1`, search `nums2` for an unused match — is O(n·m).

> [!IMPORTANT]
> **Key insight: each value appears `min(count1, count2)` times: count one array in a hash map, then spend those counts while walking the other.**

1. Build a map `value → count` from `nums1`.
2. For each `x` in `nums2`: if `count[x] > 0`, append `x` to the result and decrement `count[x]`.
3. Return the result.

Follow-ups:
- **Already sorted:** use two pointers (advance the smaller value; on equal values, record and advance both) — O(n + m) time, O(1) extra space.
- **`nums1` much smaller:** build the map from the smaller array so memory is O(min(n, m)).
- **`nums2` on disk:** keep the map of `nums1` in memory and stream `nums2` in chunks; step 2 only needs one element at a time.

## Walkthrough
`nums1 = [1,2,2,1]`, `nums2 = [2,2]`

Counts from `nums1`: `{1: 2, 2: 2}`

| x (from nums2) | count[x] before | Action | result |
|---|---|---|---|
| 2 | 2 | take, count → 1 | [2] |
| 2 | 1 | take, count → 0 | [2,2] |

Result: `[2,2]`.

## Complexity
- **Time:** O(n + m) — one pass over each array with O(1) map operations.
- **Space:** O(n) — the count map for `nums1` (the result is output).
