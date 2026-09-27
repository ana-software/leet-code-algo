# 238. Product of Array Except Self

**Difficulty:** Medium · **Topics:** Array, Prefix Sum · [LeetCode](https://leetcode.com/problems/product-of-array-except-self/)

**Theory:** [Hello Interview — Prefix Sum](https://www.hellointerview.com/learn/code/prefix-sum/overview)

## Problem
Given an integer array `nums`, return *an array* `answer` *such that* `answer[i]` *is equal to the product of all the elements of* `nums` *except* `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

**Example 2:**
```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

**Constraints:**
- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The input is generated such that `answer[i]` is **guaranteed** to fit in a **32-bit** integer.

**Follow up:** Can you solve the problem in `O(1)` extra space complexity? (The output array **does not** count as extra space for space complexity analysis.)

## Approach
Multiplying everything else for each `i` is O(n²), and "total product ÷ nums[i]" is forbidden (and breaks on zeros). The product of everything except `nums[i]` splits into two parts:

`answer[i] = (product of nums[0..i−1]) × (product of nums[i+1..n−1])`

These are **prefix and suffix products**, the multiplicative version of prefix sums.

1. Left pass: `answer[i]` = product of everything to the left of `i` (start with 1).
2. Right pass: walk from the end with a running `suffix` product; multiply `answer[i] *= suffix`, then `suffix *= nums[i]`.

Reusing the output array for the prefixes and a single variable for the suffix gives O(1) extra space (the follow-up).

## Walkthrough
`nums = [1,2,3,4]`

| i | prefix (left pass) → answer[i] | suffix before | answer[i] after right pass |
|---|---|---|---|
| 0 | 1 | 24 | 24 |
| 1 | 1 | 12 | 12 |
| 2 | 2 | 4 | 8 |
| 3 | 6 | 1 | 6 |

Result: `[24,12,8,6]`.

## Complexity
- **Time:** O(n) — two passes.
- **Space:** O(1) extra — only the `suffix` variable besides the output array.
