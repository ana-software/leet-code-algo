# 643. Maximum Average Subarray I

**Difficulty:** Easy · **Topics:** Array, Sliding Window · [LeetCode](https://leetcode.com/problems/maximum-average-subarray-i/)

## Problem
You are given an integer array `nums` consisting of `n` elements, and an integer `k`.

Find a contiguous subarray whose **length is equal to** `k` that has the maximum average value and return *this value*. Any answer with a calculation error less than `10^-5` will be accepted.

**Example 1:**
```
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
```

**Example 2:**
```
Input: nums = [5], k = 1
Output: 5.00000
```

**Constraints:**
- `n == nums.length`
- `1 <= k <= n <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Approach
All windows have the same length `k`, so the window with the largest **sum** also has the largest **average**. We only need to find the maximum sum and divide by `k` once at the end.

Recomputing each window's sum from scratch is O(n·k), which can reach 10¹⁰ operations. A fixed-size sliding window fixes that: when the window moves one step right, one element enters and one leaves, so the new sum is `sum + nums[i] − nums[i − k]`.

1. Sum the first `k` elements; this is the current and best sum.
2. For `i` from `k` to `n − 1`: add `nums[i]`, subtract `nums[i − k]`, update the best sum.
3. Return `best / k`.

## Walkthrough
`nums = [1,12,-5,-6,50,3]`, `k = 4`

| Window | Enters | Leaves | sum | best |
|---|---|---|---|---|
| [1,12,-5,-6] | — | — | 2 | 2 |
| [12,-5,-6,50] | 50 | 1 | 51 | 51 |
| [-5,-6,50,3] | 3 | 12 | 42 | 51 |

Result: `51 / 4 = 12.75`.

## Complexity
- **Time:** O(n) — each element enters and leaves the window once.
- **Space:** O(1) — only the running and best sums.
