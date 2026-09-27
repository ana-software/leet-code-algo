# 1283. Find the Smallest Divisor Given a Threshold

**Difficulty:** Medium · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search on Answer](https://www.geeksforgeeks.org/dsa/binary-search-on-answer-tutorial-with-problems/)

## Problem
Given an array of integers `nums` and an integer `threshold`, we will choose a positive integer `divisor`, divide all the array by it, and sum the division's result. Find the **smallest** `divisor` such that the result mentioned above is less than or equal to `threshold`.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: `7/3 = 3` and `10/2 = 5`).

The test cases are generated so that there will be an answer.

**Example 1:**
```
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).
```

**Example 2:**
```
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
```

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^6`
- `nums.length <= threshold <= 10^6`

## Approach
Checking one divisor costs O(n). Trying every divisor from 1 up to `max(nums)` (up to 10⁶) would be O(n · 10⁶), too slow.

Key insight (**binary search on the answer**): a larger divisor never makes the sum larger. So "is the sum ≤ threshold for divisor `d`?" is *no, …, no, yes, …, yes*, and we want the first *yes*.

1. Search `d` in `[1, max(nums)]`. At `d = max(nums)` every term is 1, so the sum is `nums.length <= threshold`: that divisor always works.
2. For `mid`, compute `Σ ceil(x / mid)`.
3. If the sum is `<= threshold`, `mid` works; a smaller one might too: `hi = mid`. Otherwise `lo = mid + 1`.
4. When `lo === hi`, return it.

## Walkthrough
`nums = [1,2,5,9]`, `threshold = 6`

| Step | lo | hi | mid | sum at mid | Action |
|---|---|---|---|---|---|
| 1 | 1 | 9 | 5 | 1+1+1+2 = 5 | 5 ≤ 6 → `hi = 5` |
| 2 | 1 | 5 | 3 | 1+1+2+3 = 7 | 7 > 6 → `lo = 4` |
| 3 | 4 | 5 | 4 | 1+1+2+3 = 7 | 7 > 6 → `lo = 5` |
| 4 | 5 | 5 | – | – | return `5` |

## Complexity
- **Time:** O(n · log M) — where M = max(nums); about 20 binary-search steps, each summing over n values.
- **Space:** O(1) — a few variables.
