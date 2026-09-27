# 58. Length of Last Word

**Difficulty:** Easy · **Topics:** String · [LeetCode](https://leetcode.com/problems/length-of-last-word/)

## Problem
Given a string `s` consisting of words and spaces, return *the length of the **last** word in the string.*

A **word** is a maximal substring consisting of non-space characters only.

**Example 1:**
```
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
```

**Example 2:**
```
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
```

**Example 3:**
```
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
```

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

## Approach
`s.trim().split(" ")` works but builds an array of every word. Only the end of the string matters, so scan it **backwards**:

1. Start at the last index and skip trailing spaces.
2. Count non-space characters until a space or the start of the string.
3. Return the count.

This touches only the trailing spaces and the last word.

## Walkthrough
`s = "Hello World"` (length 11)

| i | s[i] | Phase | length |
|---|---|---|---|
| 10 | d | count | 1 |
| 9 | l | count | 2 |
| 8 | r | count | 3 |
| 7 | o | count | 4 |
| 6 | W | count | 5 |
| 5 | ' ' | stop | 5 |

Result: `5`.

## Complexity
- **Time:** O(n) — worst case scans the whole string (a single word); usually much less.
- **Space:** O(1) — an index and a counter.
