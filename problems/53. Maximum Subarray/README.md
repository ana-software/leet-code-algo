# 53. Maximum Subarray

**Difficulty:** Medium · **Topics:** Array, Divide and Conquer, Dynamic Programming · [LeetCode](https://leetcode.com/problems/maximum-subarray/)

**Theory:** [Hello Interview — Dynamic Programming](https://www.hellointerview.com/learn/code/dynamic-programming/fundamentals)

## Problem
Given an integer array `nums`, find the subarray with the largest sum, and return *its sum*.

(A subarray is a contiguous **non-empty** sequence of elements within an array.)

**Example 1:**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

**Example 2:**
```
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
```

**Example 3:**
```
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
```

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

**Follow up:** If you have figured out the `O(n)` solution, try coding another solution using the **divide and conquer** approach, which is more subtle.

## Approach
Brute force tries every pair `(i, j)` and sums the subarray between them: O(n²) even with running sums, which is too slow for 10⁵ elements.

Key insight (Kadane's algorithm): let `cur` be the best sum of a subarray that **ends at** index `i`. That subarray either extends the best one ending at `i − 1`, or starts fresh at `i`. Extending only helps if the previous sum is positive, so:

`cur = max(nums[i], cur + nums[i])`

The answer is the largest `cur` seen at any index.

1. Start with `cur = best = nums[0]` (the subarray must be non-empty, so don't start from 0 — that would be wrong for all-negative arrays).
2. For each next element, update `cur` with the formula above, then `best = max(best, cur)`.
3. Return `best`.

## Walkthrough
`nums = [-2,1,-3,4,-1,2,1,-5,4]`

| i | nums[i] | cur + nums[i] | cur = max(...) | best |
|---|---|---|---|---|
| 0 | -2 | — | -2 | -2 |
| 1 | 1 | -1 | 1 (start fresh) | 1 |
| 2 | -3 | -2 | -2 | 1 |
| 3 | 4 | 2 | 4 (start fresh) | 4 |
| 4 | -1 | 3 | 3 | 4 |
| 5 | 2 | 5 | 5 | 5 |
| 6 | 1 | 6 | 6 | 6 |
| 7 | -5 | 1 | 1 | 6 |
| 8 | 4 | 5 | 5 | 6 |

Result: `6` (the subarray `[4,-1,2,1]`).

## Complexity
- **Time:** O(n) — one pass over the array.
- **Space:** O(1) — only two running variables.
