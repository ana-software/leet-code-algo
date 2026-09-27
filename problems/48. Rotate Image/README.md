# 48. Rotate Image

**Difficulty:** Medium · **Topics:** Array, Math, Matrix · [LeetCode](https://leetcode.com/problems/rotate-image/)

**Theory:** [Hello Interview — Matrices (Rotate Image)](https://www.hellointerview.com/learn/code/matrices/rotate-image)

## Problem
You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)
```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

**Constraints:**
- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

## Approach
A clockwise rotation sends `matrix[i][j]` to `matrix[j][n−1−i]`. Writing into a copy is easy but not allowed. The trick is that the rotation equals two simple in-place steps:

1. **Transpose** (swap across the main diagonal): `matrix[i][j] ↔ matrix[j][i]` for `j > i`. Now `(i, j)` holds the old `(j, i)`.
2. **Reverse each row**: column `j` becomes column `n−1−j`.

Combined, the old `(i, j)` ends at `(j, n−1−i)`, which is exactly a 90° clockwise turn.

## Walkthrough
`matrix = [[1,2,3],[4,5,6],[7,8,9]]`

| Step | Matrix |
|---|---|
| Start | [[1,2,3],[4,5,6],[7,8,9]] |
| Transpose | [[1,4,7],[2,5,8],[3,6,9]] |
| Reverse rows | [[7,4,1],[8,5,2],[9,6,3]] |

Result: `[[7,4,1],[8,5,2],[9,6,3]]`.

## Complexity
- **Time:** O(n²) — every cell is swapped a constant number of times.
- **Space:** O(1) — swaps in place.
