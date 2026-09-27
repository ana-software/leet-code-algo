# 11. Container With Most Water

**Difficulty:** Medium · **Topics:** Array, Two Pointers, Greedy · [LeetCode](https://leetcode.com/problems/container-with-most-water/)

## Problem
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.

**Example 1:**

![Example 1](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

**Example 2:**
```
Input: height = [1,1]
Output: 1
```

**Constraints:**
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Approach
The water held by lines `i < j` is `min(height[i], height[j]) * (j − i)`. Trying every pair is O(n²) — up to 5 · 10⁹ pairs, far too slow.

Key insight: start with the widest container (`left = 0`, `right = n − 1`) and move pointers inward. Every move makes the width smaller, so the only way to get more water is a taller limiting line. The **shorter** line is the limit: pairing it with any line further inward gives a smaller width and a height that is still at most the shorter line, so no such container can beat the current one. That line can be discarded safely.

1. `left = 0`, `right = n − 1`, `best = 0`.
2. While `left < right`: compute the area, update `best`, then move the pointer at the shorter line inward (on a tie, moving either is fine).
3. Return `best`.

## Walkthrough
`height = [1,8,6,2,5,4,8,3,7]`

| left | right | h[left] | h[right] | area = min × width | best | Move |
|---|---|---|---|---|---|---|
| 0 | 8 | 1 | 7 | 1 × 8 = 8 | 8 | left (shorter) |
| 1 | 8 | 8 | 7 | 7 × 7 = 49 | 49 | right |
| 1 | 7 | 8 | 3 | 3 × 6 = 18 | 49 | right |
| 1 | 6 | 8 | 8 | 8 × 5 = 40 | 49 | right (tie) |
| 1 | 5 | 8 | 4 | 4 × 4 = 16 | 49 | right |
| 1 | 4 | 8 | 5 | 5 × 3 = 15 | 49 | right |
| 1 | 3 | 8 | 2 | 2 × 2 = 4 | 49 | right |
| 1 | 2 | 8 | 6 | 6 × 1 = 6 | 49 | right |

Result: `49`.

## Complexity
- **Time:** O(n) — each step moves one pointer inward, n − 1 steps in total.
- **Space:** O(1) — a few variables.
