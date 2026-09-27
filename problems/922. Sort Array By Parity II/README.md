# 922. Sort Array By Parity II

**Difficulty:** Easy · **Topics:** Array, Two Pointers, Sorting · [LeetCode](https://leetcode.com/problems/sort-array-by-parity-ii/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/overview) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
Given an array of integers `nums`, half of the integers in `nums` are **odd**, and the other half are **even**.

Sort the array so that whenever `nums[i]` is odd, `i` is **odd**, and whenever `nums[i]` is even, `i` is **even**.

Return *any answer array that satisfies this condition*.

**Example 1:**
```
Input: nums = [4,2,5,7]
Output: [4,5,2,7]
Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.
```

**Example 2:**
```
Input: nums = [2,3]
Output: [2,3]
```

**Constraints:**
- `2 <= nums.length <= 2 * 10^4`
- `nums.length` is even.
- Half of the integers in `nums` are even.
- `0 <= nums[i] <= 1000`

**Follow Up:** Could you solve it in-place?

## Approach
The easy way is to build a new array: put evens at indices 0, 2, 4, … and odds at 1, 3, 5, …. That's O(n) time but O(n) extra space. The follow-up asks for in-place.

> [!IMPORTANT]
> **Key insight: every odd number at an even index has a matching even number at an odd index to swap with.**
>
> Since exactly half the numbers are even, every even index holding an odd number is matched by some odd index holding an even number. Swapping those two fixes both positions at once.

1. Keep a pointer `i` over even indices (0, 2, 4, …) and a pointer `j` over odd indices (1, 3, 5, …).
2. Move `i` forward by 2 while `nums[i]` is even (already in place).
3. When `nums[i]` is odd, move `j` forward by 2 until `nums[j]` is even (misplaced), then swap `nums[i]` and `nums[j]`.
4. Stop when `i` runs past the end. All even indices are then correct, so all odd indices are too.

`j` only ever moves forward, so both pointers together make one pass.

## Walkthrough
`nums = [4,2,5,7]`

| Step | i | nums[i] | j | nums[j] | Action | nums |
|---|---|---|---|---|---|---|
| 1 | 0 | 4 (even) | 1 | — | in place, i += 2 | [4,2,5,7] |
| 2 | 2 | 5 (odd) | 1 | 2 (even) | swap nums[2], nums[1] | [4,5,2,7] |
| 3 | 4 | — | — | — | i past end, stop | [4,5,2,7] |

Result: `[4,5,2,7]`.

## Complexity
- **Time:** O(n) — `i` and `j` each move across the array once.
- **Space:** O(1) — the array is rearranged in place.
