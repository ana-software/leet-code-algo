# 153. Find Minimum in Rotated Sorted Array

**Difficulty:** Medium · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/)

## Problem
Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in `O(log n) time`.

**Example 1:**
```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

**Example 3:**
```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are **unique**.
- `nums` is sorted and rotated between `1` and `n` times.

## Approach
A rotated sorted array is two sorted runs, and the minimum is the first element of the second run (the "drop"). Scanning for it is O(n); the problem asks for O(log n).

Key insight: compare `nums[mid]` with the **last element of the range**, `nums[hi]`.
- `nums[mid] > nums[hi]`: the values drop somewhere after `mid`, so the minimum is **strictly right** of `mid`: `lo = mid + 1`.
- `nums[mid] < nums[hi]`: `mid..hi` is sorted, so nothing to the right of `mid` is smaller. The minimum is **`mid` or left of it**: `hi = mid`.

Values are unique, and `mid < hi` inside the loop, so they are never equal. When `lo === hi`, `nums[lo]` is the minimum.

Comparing with `nums[hi]` (not `nums[lo]`) also handles an array that isn't rotated at all (Example 3): every step takes the `hi = mid` branch.

## Walkthrough
`nums = [3,4,5,1,2]`

| Step | lo | hi | mid | nums[mid] | nums[hi] | Action |
|---|---|---|---|---|---|---|
| 1 | 0 | 4 | 2 | 5 | 2 | 5 > 2 → `lo = 3` |
| 2 | 3 | 4 | 3 | 1 | 2 | 1 < 2 → `hi = 3` |
| 3 | 3 | 3 | – | – | – | return `nums[3] = 1` |

## Complexity
- **Time:** O(log n) — the search range halves every step.
- **Space:** O(1) — two indices.
