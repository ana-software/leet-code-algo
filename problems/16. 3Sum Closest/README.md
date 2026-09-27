# 16. 3Sum Closest

**Difficulty:** Medium · **Topics:** Array, Two Pointers, Sorting · [LeetCode](https://leetcode.com/problems/3sum-closest/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/3-sum) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
You are given an integer array `nums` of length `n` and an integer `target`.

Find three integers at **distinct indices** in `nums` such that the sum is **closest** to `target`.

Return the sum of the three integers.

You may assume that each input would have **exactly** one solution.

**Example 1:**
```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

**Example 2:**
```
Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
```

**Constraints:**
- `3 <= nums.length <= 500`
- `-1000 <= nums[i] <= 1000`
- `-10^4 <= target <= 10^4`

## Approach
Trying every triple is O(n³), about 2 · 10⁷ triples at n = 500. That may pass, but the sorted two-pointer scan from 3Sum does it in O(n²).

Key insight: after **sorting**, fix the first number `nums[i]` and look for the other two in `nums[i+1..n-1]` with two pointers. If the current sum is too small, only moving `lo` right can make it bigger; if it's too big, only moving `hi` left can make it smaller. Each move gets closer to the target (or rules out a pair that can't be better), so no candidate is missed.

1. Sort `nums`. Start `best` with the sum of the first three numbers.
2. For each `i` from `0` to `n − 3`, set `lo = i + 1`, `hi = n − 1`. While `lo < hi`:
   - `sum = nums[i] + nums[lo] + nums[hi]`.
   - If `|sum − target| < |best − target|`, set `best = sum`.
   - If `sum < target`, move `lo` right; if `sum > target`, move `hi` left; if equal, return `sum` right away (it can't get closer).
3. Return `best`.

## Walkthrough
`nums = [-1,2,1,-4]`, `target = 1` → sorted `[-4,-1,1,2]`, starting `best = -4 + -1 + 1 = -4`

| i | nums[i] | lo, hi | sum | \|sum − 1\| | best | Move |
|---|---|---|---|---|---|---|
| 0 | -4 | 1, 3 (-1, 2) | -3 | 4 | -3 | sum < 1 → lo++ |
| 0 | -4 | 2, 3 (1, 2) | -1 | 2 | -1 | sum < 1 → lo++ (stop) |
| 1 | -1 | 2, 3 (1, 2) | 2 | 1 | 2 | sum > 1 → hi-- (stop) |

Result: `2`.

## Complexity
- **Time:** O(n²) — for each `i`, a linear two-pointer scan (sorting is O(n log n)).
- **Space:** O(log n) to O(n) for sorting; the scan itself uses O(1).
