# 33. Search in Rotated Sorted Array

**Difficulty:** Medium · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/search-in-rotated-sorted-array)

## Problem
There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **possibly left rotated** at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return *the index of* `target` *if it is in* `nums`*, or* `-1` *if it is not in* `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**
```
Input: nums = [1], target = 0
Output: -1
```

**Constraints:**
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are **unique**.
- `nums` is an ascending array that is possibly rotated.
- `-10^4 <= target <= 10^4`

## Approach
A linear scan is O(n); the problem requires O(log n). Plain binary search doesn't work directly, because the array as a whole isn't sorted.

Key insight: split the range at `mid`. **At least one of the two halves is always sorted**, because the rotation point can only be in one of them. On a sorted half, a simple range check tells us whether `target` is inside it.

1. If `nums[mid] === target`, return `mid`.
2. If `nums[lo] <= nums[mid]`, the **left half** `lo..mid` is sorted:
   - if `nums[lo] <= target < nums[mid]`, search left (`hi = mid - 1`); otherwise search right (`lo = mid + 1`).
3. Otherwise the **right half** `mid..hi` is sorted:
   - if `nums[mid] < target <= nums[hi]`, search right (`lo = mid + 1`); otherwise search left (`hi = mid - 1`).
4. If the range empties, return `-1`.

## Walkthrough
`nums = [4,5,6,7,0,1,2]`, `target = 0`

| Step | lo | hi | mid | nums[mid] | Sorted half | Target inside it? | Action |
|---|---|---|---|---|---|---|---|
| 1 | 0 | 6 | 3 | 7 | left `[4..7]` | no | `lo = 4` |
| 2 | 4 | 6 | 5 | 1 | left `[0..1]` | yes (0 ≤ 0 < 1) | `hi = 4` |
| 3 | 4 | 4 | 4 | 0 | – | – | found → return `4` |

## Complexity
- **Time:** O(log n) — every step discards half of the range.
- **Space:** O(1) — a few indices.
