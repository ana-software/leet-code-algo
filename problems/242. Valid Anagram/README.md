# 242. Valid Anagram

**Difficulty:** Easy · **Topics:** Hash Table, String, Sorting · [LeetCode](https://leetcode.com/problems/valid-anagram/)

**Theory:** [GeeksforGeeks — Hashing](https://www.geeksforgeeks.org/dsa/hashing-data-structure/)

## Problem
Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`, and `false` otherwise.

**Example 1:**
```
Input: s = "anagram", t = "nagaram"
Output: true
```

**Example 2:**
```
Input: s = "rat", t = "car"
Output: false
```

**Constraints:**
- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## Approach
Two strings are anagrams exactly when they have the same length and the same count of every letter. Sorting both strings and comparing works in O(n log n); counting is O(n).

1. If the lengths differ, return `false`.
2. Keep one `count[26]` array: `+1` for each letter of `s`, `−1` for each letter of `t`.
3. The strings are anagrams iff every count is back to 0.

**Follow-up (Unicode):** replace the fixed array with a `Map<string, number>` keyed by code point (iterate with `for...of`, which walks code points rather than UTF-16 units).

## Walkthrough
`s = "anagram"`, `t = "nagaram"` (only non-zero letters shown)

| After | a | g | m | n | r |
|---|---|---|---|---|---|
| counting s (+1) | 3 | 1 | 1 | 1 | 1 |
| counting t (−1) | 0 | 0 | 0 | 0 | 0 |

All counts are 0 → `true`.

## Complexity
- **Time:** O(n) — one pass over each string, plus 26 checks.
- **Space:** O(1) — a fixed 26-entry array.
