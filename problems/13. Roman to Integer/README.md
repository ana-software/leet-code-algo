# 13. Roman to Integer

**Difficulty:** Easy · **Topics:** Hash Table, Math, String · [LeetCode](https://leetcode.com/problems/roman-to-integer/)

**Theory:** [GeeksforGeeks — Roman to Integer](https://www.geeksforgeeks.org/dsa/roman-number-to-integer/)

## Problem
Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numeral, just two ones added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

**Example 1:**
```
Input: s = "III"
Output: 3
Explanation: III = 3.
```

**Example 2:**
```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

**Example 3:**
```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

**Constraints:**
- `1 <= s.length <= 15`
- `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
- It is **guaranteed** that `s` is a valid roman numeral in the range `[1, 3999]`.

## Approach
All six subtraction cases share one rule: **a symbol is subtracted exactly when a larger symbol follows it**; otherwise it is added. So there is no need to list `IV`, `IX`, ... separately.

1. Map each symbol to its value.
2. For each index `i`: if `value(s[i]) < value(s[i+1])`, subtract it; otherwise add it.
3. The last symbol is always added.

## Walkthrough
`s = "MCMXCIV"`

| i | symbol | value | next | Action | total |
|---|---|---|---|---|---|
| 0 | M | 1000 | C (100) | add | 1000 |
| 1 | C | 100 | M (1000) | subtract | 900 |
| 2 | M | 1000 | X (10) | add | 1900 |
| 3 | X | 10 | C (100) | subtract | 1890 |
| 4 | C | 100 | I (1) | add | 1990 |
| 5 | I | 1 | V (5) | subtract | 1989 |
| 6 | V | 5 | — | add | 1994 |

Result: `1994`.

## Complexity
- **Time:** O(n) — one pass over at most 15 characters.
- **Space:** O(1) — a fixed 7-entry lookup table.
