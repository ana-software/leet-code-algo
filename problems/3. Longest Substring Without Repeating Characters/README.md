# 3. Longest Substring Without Repeating Characters

**Difficulty:** Medium · **Topics:** Hash Table, String, Sliding Window · [LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**Theory:** [Hello Interview — Sliding Window (variable size)](https://www.hellointerview.com/learn/code/sliding-window/longest-substring-without-repeating-characters) · [GeeksforGeeks — Sliding Window](https://www.geeksforgeeks.org/dsa/window-sliding-technique/)

## Problem
Given a string `s`, find the length of the **longest** **substring** without duplicate characters.

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**
```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Constraints:**
- `0 <= s.length <= 10^5`
- `s` consists of English letters, digits, symbols and spaces.

## Approach
> [!IMPORTANT]
> **Key insight: keep a window with no duplicates; on a repeat, jump `left` straight past the character's last occurrence.**
>
> Checking every substring for duplicates is O(n²) or worse. Instead keep a window `[left, right]` that never contains a duplicate, and grow it one character at a time.
>
> Store the last index where each character was seen. When `s[right]` was last seen at an index `≥ left`, it is inside the window, so jump `left` straight past it (`left = last[s[right]] + 1`). This avoids shrinking one step at a time.

1. `left = 0`, `best = 0`, `last = new Map()`.
2. For each `right`: if `last[s[right]] >= left`, set `left = last[s[right]] + 1`.
3. Record `last[s[right]] = right`; update `best = max(best, right − left + 1)`.

## Walkthrough
`s = "abcabcbb"`

| right | char | last seen | left | window | best |
|---|---|---|---|---|---|
| 0 | a | — | 0 | a | 1 |
| 1 | b | — | 0 | ab | 2 |
| 2 | c | — | 0 | abc | 3 |
| 3 | a | 0 | 1 | bca | 3 |
| 4 | b | 1 | 2 | cab | 3 |
| 5 | c | 2 | 3 | abc | 3 |
| 6 | b | 4 | 5 | cb | 3 |
| 7 | b | 6 | 7 | b | 3 |

Result: `3`.

## Complexity
- **Time:** O(n) — `right` visits each character once and `left` only moves forward.
- **Space:** O(k) — the map holds at most one entry per distinct character (k ≤ 95 printable ASCII).
