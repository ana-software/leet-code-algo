# 852. Peak Index in a Mountain Array

**Difficulty:** Medium · **Topics:** Array, Binary Search, Ternary Search · [LeetCode](https://leetcode.com/problems/peak-index-in-a-mountain-array/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/)

## Problem
You are given an integer **mountain** array `arr` of length `n` where the values increase to a **peak element** and then decrease.

Return the index of the peak element.

Your task is to solve it in `O(log(n))` time complexity.

**Example 1:**
```
Input: arr = [0,1,0]
Output: 1
```

**Example 2:**
```
Input: arr = [0,2,1,0]
Output: 1
```

**Example 3:**
```
Input: arr = [0,10,5,2]
Output: 1
```

**Constraints:**
- `3 <= arr.length <= 10^5`
- `0 <= arr[i] <= 10^6`
- `arr` is **guaranteed** to be a mountain array.

## Approach
Scanning for the maximum is O(n), but the problem asks for O(log n).

> [!IMPORTANT]
> **Key insight: compare `arr[mid]` with its right neighbour to tell which slope you're on.**
>
> Compare `arr[mid]` with its right neighbour.
> - `arr[mid] < arr[mid + 1]`: we are on the rising slope, so the peak is **strictly to the right** of `mid`.
> - Otherwise we are on the falling slope (or at the peak), so the peak is **`mid` or to its left**.

This is a yes/no question that flips exactly once (at the peak), so binary search finds that point:

1. `lo = 0`, `hi = n - 1`.
2. While `lo < hi`: if rising, `lo = mid + 1`; else `hi = mid`.
3. `lo` is the peak index. (`mid < hi` always holds, so `mid + 1` is always in range.)

## Walkthrough
`arr = [0,1,0]`

| Step | lo | hi | mid | arr[mid] vs arr[mid+1] | Action |
|---|---|---|---|---|---|
| 1 | 0 | 2 | 1 | 1 vs 0 → falling | `hi = 1` |
| 2 | 0 | 1 | 0 | 0 vs 1 → rising | `lo = 1` |
| 3 | 1 | 1 | – | – | return `1` |

## Complexity
- **Time:** O(log n) — the search range halves every step.
- **Space:** O(1) — two indices.
