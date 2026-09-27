# 151. Reverse Words in a String

**Difficulty:** Medium · **Topics:** Two Pointers, String · [LeetCode](https://leetcode.com/problems/reverse-words-in-a-string/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/overview) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
Given an input string `s`, reverse the order of the **words**.

A **word** is defined as a sequence of non-space characters. The **words** in `s` will be separated by at least one space.

Return *a string of the words in reverse order concatenated by a single space.*

**Note** that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

**Example 1:**
```
Input: s = "the sky is blue"
Output: "blue is sky the"
```

**Example 2:**
```
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
```

**Example 3:**
```
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` contains English letters (upper-case and lower-case), digits, and spaces `' '`.
- There is **at least one** word in `s`.

**Follow-up:** If the string data type is mutable in your language, can you solve it **in-place** with `O(1)` extra space?

## Approach
The one-liner `s.trim().split(/\s+/).reverse().join(" ")` is correct; the interview version does the same thing explicitly with two pointers scanning from the **right**, so words come out already in reverse order and extra spaces are never copied.

1. Set `i = n − 1`.
2. Skip spaces leftwards. If `i < 0`, stop.
3. Mark `end = i`, then move `i` left while `s[i]` is not a space; the word is `s[i+1..end]`.
4. Append it to the result list and repeat from step 2.
5. Join the words with a single space.

(JavaScript strings are immutable, so the follow-up's in-place "reverse the whole string, then reverse each word" variant needs a char array anyway; it would not save space here.)

## Walkthrough
`s = "the sky is blue"`

| Word found (right to left) | i after | words |
|---|---|---|
| blue | 10 | [blue] |
| is | 7 | [blue, is] |
| sky | 3 | [blue, is, sky] |
| the | -1 | [blue, is, sky, the] |

Result: `"blue is sky the"`.

## Complexity
- **Time:** O(n) — each character is visited once, plus O(n) to join.
- **Space:** O(n) — the list of words / output string.
