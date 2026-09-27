# 438. Find All Anagrams in a String

**Difficulty:** Medium · **Topics:** Hash Table, String, Sliding Window · [LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

**Theory:** [Hello Interview — Sliding Window (fixed size)](https://www.hellointerview.com/learn/code/sliding-window/fixed-length) · [GeeksforGeeks — Sliding Window](https://www.geeksforgeeks.org/dsa/window-sliding-technique/)

## Problem
Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in **any order**.

**Example 1:**
```
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
```

**Example 2:**
```
Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
```

**Constraints:**
- `1 <= s.length, p.length <= 3 * 10^4`
- `s` and `p` consist of lowercase English letters.

## Approach
An anagram of `p` is any window of length `m = p.length` with the same letter counts. Sorting or recounting every window costs O(n·m). Instead slide a **fixed-size window** and update counts incrementally.

Keep one array `need[26]`: start from `p`'s counts and subtract the window's counts. Track `diff`, the number of letters whose `need` is non-zero. The window is an anagram exactly when `diff == 0`.

1. If `m > n`, return `[]`.
2. Fill `need` from `p`; `diff` = number of distinct letters in `p`.
3. For each `i`: letter `s[i]` enters (`need--`), and once `i ≥ m`, letter `s[i−m]` leaves (`need++`). Each change updates `diff` when a count moves to or away from 0.
4. When `i ≥ m − 1` and `diff == 0`, record start `i − m + 1`.

## Walkthrough
`s = "cbaebabacd"`, `p = "abc"` (`m = 3`). `diff` starts at 3 (a, b, c each need 1).

| i | enters | leaves | window | diff | match? |
|---|---|---|---|---|---|
| 0 | c | — | c | 2 | — |
| 1 | b | — | cb | 1 | — |
| 2 | a | — | cba | 0 | start 0 ✓ |
| 3 | e | c | bae | 2 | no |
| 4 | b | b | aeb | 2 | no |
| 5 | a | a | eba | 2 | no |
| 6 | b | e | bab | 2 | no |
| 7 | a | b | aba | 2 | no |
| 8 | c | a | bac | 0 | start 6 ✓ |
| 9 | d | b | acd | 2 | no |

Result: `[0,6]`.

## Complexity
- **Time:** O(n + m) — each character of `s` enters and leaves once; `p` is counted once.
- **Space:** O(1) — a 26-entry count array (the output excluded).
