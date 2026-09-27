# 167. Two Sum II - Input Array Is Sorted

**Difficulty:** Medium · **Topics:** Array, Two Pointers, Binary Search · [LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/overview)

## Problem
You are given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**.

Find **two** numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers `index1` and `index2` as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.

**Example 1:**
```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

**Example 2:**
```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
```

**Example 3:**
```
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

**Constraints:**
- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in **non-decreasing order**.
- `-1000 <= target <= 1000`
- The tests are generated such that there is **exactly one solution**.

## Approach
The array is sorted, so we can use two pointers from opposite ends instead of a hash map. A hash map (as in the original Two Sum) would be O(n) time, but it uses O(n) extra space, and the problem asks for constant space. Checking every pair would be O(n²), which is too slow for 3 · 10⁴ elements.

Key insight: with `left` at the smallest remaining value and `right` at the largest, the sum `numbers[left] + numbers[right]` tells us which pointer to move:
- If the sum is **too small**, `numbers[left]` can't be part of the answer with any element (even the largest one left isn't enough), so move `left` right.
- If the sum is **too large**, `numbers[right]` can't be part of the answer with any element (even the smallest one left is too much), so move `right` left.
- If the sum equals `target`, return `[left + 1, right + 1]` (convert to 1-indexed).

Each step discards one element that can't be in the answer, so the pointers never skip the solution.

## Walkthrough
`numbers = [2,7,11,15]`, `target = 9`

| Step | left | right | numbers[left] | numbers[right] | sum | Action |
|---|---|---|---|---|---|---|
| 1 | 0 | 3 | 2 | 15 | 17 | 17 > 9 → `right--` |
| 2 | 0 | 2 | 2 | 11 | 13 | 13 > 9 → `right--` |
| 3 | 0 | 1 | 2 | 7 | 9 | found → return `[1, 2]` |

## Complexity
- **Time:** O(n) — each iteration moves one pointer inward, so there are at most n − 1 iterations.
- **Space:** O(1) — only two index variables (the returned pair is part of the output).
