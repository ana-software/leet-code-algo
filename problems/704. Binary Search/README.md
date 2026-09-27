# 704. Binary Search

**Difficulty:** Easy · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/binary-search/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/)

## Problem
Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

**Example 2:**
```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All the integers in `nums` are **unique**.
- `nums` is sorted in ascending order.

## Approach
> [!IMPORTANT]
> **Key insight: one comparison with the middle element rules out half the range.**
>
> A linear scan is O(n). Because the array is sorted, one comparison with the middle element tells us which half can still contain `target`, so we can throw the other half away.

1. Keep a closed range `[lo, hi]`, starting with the whole array.
2. While `lo <= hi`, look at `mid`:
   - `nums[mid] === target` → return `mid`.
   - `nums[mid] < target` → target can only be to the right: `lo = mid + 1`.
   - `nums[mid] > target` → target can only be to the left: `hi = mid - 1`.
3. If the range becomes empty, return `-1`.

## Walkthrough
`nums = [-1,0,3,5,9,12]`, `target = 9`

| Step | lo | hi | mid | nums[mid] | Action |
|---|---|---|---|---|---|
| 1 | 0 | 5 | 2 | 3 | 3 < 9 → `lo = 3` |
| 2 | 3 | 5 | 4 | 9 | found → return `4` |

## Complexity
- **Time:** O(log n) — the search range halves every step.
- **Space:** O(1) — two indices.
