# 18. 4Sum

**Difficulty:** Medium · **Topics:** Array, Two Pointers, Sorting · [LeetCode](https://leetcode.com/problems/4sum/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/3-sum) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
Given an array `nums` of `n` integers, return *an array of all the **unique** quadruplets* `[nums[a], nums[b], nums[c], nums[d]]` such that:

- `0 <= a, b, c, d < n`
- `a`, `b`, `c`, and `d` are **distinct**.
- `nums[a] + nums[b] + nums[c] + nums[d] == target`

You may return the answer in **any order**.

**Example 1:**
```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

**Example 2:**
```
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
```

**Constraints:**
- `1 <= nums.length <= 200`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`

## Approach
Trying every four indices is O(n⁴), about 1.6 · 10⁹ combinations at n = 200 — too slow, and it still needs extra work to drop duplicate quadruplets.

Key insight: this is 3Sum with one more outer loop. After **sorting**, fix the first two numbers and find the last two with the classic Two Sum II two-pointer scan. Sorting also makes duplicates adjacent, so they are easy to skip.

1. Sort `nums`.
2. For each `i` (first number), skip it if `nums[i] === nums[i-1]` (same first number, same results).
3. For each `j > i` (second number), skip it the same way if `nums[j] === nums[j-1]` and `j > i + 1`.
4. Set `lo = j + 1`, `hi = n - 1`. While `lo < hi`:
   - `sum = nums[i] + nums[j] + nums[lo] + nums[hi]`.
   - If `sum < target`, move `lo` right; if `sum > target`, move `hi` left.
   - If equal, record the quadruplet, move both pointers, and skip any repeated values at `lo` and `hi`.
5. Return all recorded quadruplets.

Sums can reach 4 · 10⁹, which is beyond 32-bit integers, but JavaScript numbers hold it exactly.

## Walkthrough
`nums = [1,0,-1,0,-2,2]`, `target = 0` → sorted `[-2,-1,0,0,1,2]`

| i | j | lo, hi scan (values) | Found |
|---|---|---|---|
| -2 | -1 | (0,2) sum −1 → lo++; (0,2) −1 → lo++; (1,2) 0 ✔ | [-2,-1,1,2] |
| -2 | 0 | (0,2) sum 0 ✔ | [-2,0,0,2] |
| -2 | 0 (dup) | skipped | — |
| -2 | 1 | lo = hi, nothing | — |
| -1 | 0 | (0,2) sum 1 → hi--; (0,1) 0 ✔ | [-1,0,0,1] |
| -1 | 0 (dup), 1 | skipped / nothing | — |
| 0 | 0 | (1,2) sum 3 → hi--, stop | — |
| 0 (dup), 1 | … | skipped / too few elements | — |

Result: `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`.

## Complexity
- **Time:** O(n³) — two nested loops, each with a linear two-pointer scan (sorting is O(n log n)).
- **Space:** O(log n) to O(n) for sorting, not counting the output.
