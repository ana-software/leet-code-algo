# 35. Search Insert Position

**Difficulty:** Easy · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/search-insert-position/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/)

## Problem
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**
```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

**Example 2:**
```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

**Example 3:**
```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

**Constraints:**
- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` contains **distinct** values sorted in **ascending** order.
- `-10^4 <= target <= 10^4`

## Approach
> [!IMPORTANT]
> **Key insight: the answer is the first index with a value `>= target`: a lower-bound binary search.**
>
> Both answers ("where it is" and "where it would go") are the same index: the **first position whose value is `>= target`**. This is the classic *lower bound* search.

A linear scan finds it in O(n), but the problem asks for O(log n), and the array is sorted, so binary search works:

1. Search the range `[lo, hi)` with `lo = 0`, `hi = nums.length`. Using `nums.length` as the upper end allows "insert after everything".
2. Take `mid`. If `nums[mid] < target`, the answer is strictly to the right: `lo = mid + 1`.
3. Otherwise `mid` could be the answer, so keep it: `hi = mid`.
4. When `lo === hi`, that index is the answer.

## Walkthrough
`nums = [1,3,5,6]`, `target = 5`

| Step | lo | hi | mid | nums[mid] | Action |
|---|---|---|---|---|---|
| 1 | 0 | 4 | 2 | 5 | 5 >= 5 → `hi = 2` |
| 2 | 0 | 2 | 1 | 3 | 3 < 5 → `lo = 2` |
| 3 | 2 | 2 | – | – | `lo === hi` → return `2` |

## Complexity
- **Time:** O(log n) — the search range halves every step.
- **Space:** O(1) — two indices.
