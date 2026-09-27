# 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold

**Difficulty:** Medium · **Topics:** Array, Binary Search, Matrix, Prefix Sum · [LeetCode](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)

**Theory:** [Hello Interview — Prefix Sum](https://www.hellointerview.com/learn/code/prefix-sum/overview) · [GeeksforGeeks — Prefix Sum](https://www.geeksforgeeks.org/dsa/prefix-sum-array-implementation-applications-competitive-programming/)

## Problem
Given a `m x n` matrix `mat` and an integer `threshold`, return *the maximum side-length of a square with a sum less than or equal to* `threshold` *or return* `0` *if there is no such square*.

**Example 1:**

![Example 1](https://assets.leetcode.com/uploads/2019/12/05/e1.png)

```
Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
Output: 2
Explanation: The maximum side length of square with sum less than or equal to 4 is 2 as shown.
```

**Example 2:**
```
Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
Output: 0
```

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 300`
- `0 <= mat[i][j] <= 10^4`
- `0 <= threshold <= 10^5`

## Approach
Summing every square cell by cell is O(m·n·min(m,n)³), far too slow.

**Step 1: 2D prefix sums.** Let `P[i][j]` be the sum of the top-left `i × j` block. Then the sum of any `k × k` square with bottom-right corner `(i, j)` is
`P[i][j] − P[i−k][j] − P[i][j−k] + P[i−k][j−k]`, which takes O(1).

**Step 2: only try to grow the answer by one.** With O(1) square sums we could test every side length at every cell (O(m·n·min(m,n))), or binary search the side length (O(m·n·log)). There is a simpler way. Keep `best`, the largest side found so far, and at each cell test only one square: side `best + 1`, ending at that cell. If it fits, `best++`.

Why this is enough: all values are non-negative, so any square inside a valid square is valid too. If a square of side `s` ends at `(i, j)`, then the side `s − 1` square ending at `(i−1, j−1)` is inside it. That cell is processed earlier, so `best` is already at least `s − 1` when we reach `(i, j)`, and the `best + 1` test catches side `s`.

We fill `P` and test in the same pass, since `P[i][j]` only needs cells above and to the left.

## Walkthrough
`mat` = three rows of `[1,1,3,2,4,3,2]`, `threshold = 4`. Indices below are 1-based (as in `P`).

| Cell (i, j) | Test side k = best + 1 | Square sum | Result |
|---|---|---|---|
| (1, 1) | 1 | 1 | ≤ 4 → `best = 1` |
| (1, 2..7) | 2 | – | i < 2, too close to the top: skip |
| (2, 1) | 2 | – | j < 2: skip |
| (2, 2) | 2 | 1+1+1+1 = 4 | ≤ 4 → `best = 2` |
| (2, 3..7) | 3 | – | i < 3: skip |
| (3, 1..2) | 3 | – | j < 3: skip |
| (3, 3) | 3 | 3·(1+1+3) = 15 | > 4 |
| (3, 4) | 3 | 3·(1+3+2) = 18 | > 4 |
| (3, 5..7) | 3 | 27, 27, 27 | > 4 |

Return `best = 2`.

## Complexity
- **Time:** O(m · n) — one pass; each cell does O(1) work for the prefix sum and one square test.
- **Space:** O(m · n) — the prefix-sum table.
