# 42. Trapping Rain Water

**Difficulty:** Hard · **Topics:** Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack · [LeetCode](https://leetcode.com/problems/trapping-rain-water/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/trapping-rain-water) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**

![elevation map](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png)

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
```

**Example 2:**
```
Input: height = [4,2,0,3,2,5]
Output: 9
```

**Constraints:**
- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Approach
The water above bar `i` is `min(maxLeft(i), maxRight(i)) − height[i]`, where `maxLeft` / `maxRight` are the tallest bars on each side (including `i`). Scanning left and right for every bar is O(n²). Precomputing both max arrays makes it O(n) time but O(n) extra space.

> [!IMPORTANT]
> **Key insight: the water at a bar depends only on the smaller of the two maxima, so always process the shorter side.**
>
> We don't need both maxima exactly, only the **smaller** one. Put a pointer at each end and track `leftMax` and `rightMax` seen so far.
>
> - We always move the pointer at the **shorter** bar, so the taller bar seen so far stays under one of the pointers. When `height[l] < height[r]`, that means `leftMax ≤ max(height[r..n−1])`: the right side of `l` has a wall at least as tall as `leftMax`. So `min(maxLeft(l), maxRight(l)) = leftMax`, and the water at `l` is `leftMax − height[l]`.
> - Otherwise the same argument works for `r` with `rightMax`.

1. `l = 0`, `r = n − 1`, `leftMax = rightMax = 0`, `water = 0`.
2. While `l < r`:
   - If `height[l] < height[r]`: update `leftMax`, add `leftMax − height[l]`, move `l` right.
   - Else: update `rightMax`, add `rightMax − height[r]`, move `r` left.
3. Return `water`.

## Walkthrough
`height = [0,1,0,2,1,0,1,3,2,1,2,1]`

| l | r | h[l] | h[r] | Side | leftMax | rightMax | Added | water |
|---|---|---|---|---|---|---|---|---|
| 0 | 11 | 0 | 1 | left | 0 | 0 | 0 | 0 |
| 1 | 11 | 1 | 1 | right | 0 | 1 | 0 | 0 |
| 1 | 10 | 1 | 2 | left | 1 | 1 | 0 | 0 |
| 2 | 10 | 0 | 2 | left | 1 | 1 | 1 | 1 |
| 3 | 10 | 2 | 2 | right | 1 | 2 | 0 | 1 |
| 3 | 9 | 2 | 1 | right | 1 | 2 | 1 | 2 |
| 3 | 8 | 2 | 2 | right | 1 | 2 | 0 | 2 |
| 3 | 7 | 2 | 3 | left | 2 | 2 | 0 | 2 |
| 4 | 7 | 1 | 3 | left | 2 | 2 | 1 | 3 |
| 5 | 7 | 0 | 3 | left | 2 | 2 | 2 | 5 |
| 6 | 7 | 1 | 3 | left | 2 | 2 | 1 | 6 |

`l = r = 7`, stop. Result: `6`.

## Complexity
- **Time:** O(n) — each step moves one pointer inward.
- **Space:** O(1) — two pointers and two running maxima.
