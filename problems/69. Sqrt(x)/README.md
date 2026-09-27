# 69. Sqrt(x)

**Difficulty:** Easy · **Topics:** Math, Binary Search · [LeetCode](https://leetcode.com/problems/sqrtx/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/)

## Problem
Given a non-negative integer `x`, return *the square root of* `x` *rounded down to the nearest integer*. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.

- For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.

**Example 1:**
```
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

**Example 2:**
```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
```

**Constraints:**
- `0 <= x <= 2^31 - 1`

## Approach
> [!IMPORTANT]
> **Key insight: binary search for the largest `m` with `m * m <= x`.**
>
> We want the **largest integer `m` with `m * m <= x`**. The condition `m * m <= x` is true for small `m` and false for large `m` (it flips once), so we can binary search for the last `m` where it is true.

Trying every `m` from 1 upward takes O(√x), about 46,000 steps for the largest input. Binary search takes about 31.

1. `x = 0` and `x = 1` are their own square roots.
2. For `x >= 2`, the root is at most `x / 2`, so search `[1, x / 2]`.
3. Take the **upper** middle `mid` (so `lo = mid` always makes progress). If `mid <= floor(x / mid)`, then `mid * mid <= x`, so `mid` works and the answer is `mid` or larger: `lo = mid`. Otherwise `hi = mid - 1`.
4. When `lo === hi`, return it.

Comparing `mid <= floor(x / mid)` instead of `mid * mid <= x` keeps the numbers small. In languages with 32-bit ints, the product would overflow.

## Walkthrough
`x = 4`

| Step | lo | hi | mid | floor(x / mid) | Action |
|---|---|---|---|---|---|
| 1 | 1 | 2 | 2 | 2 | 2 <= 2 → `lo = 2` |
| 2 | 2 | 2 | – | – | `lo === hi` → return `2` |

## Complexity
- **Time:** O(log x) — the search range halves every step.
- **Space:** O(1) — a few variables.
