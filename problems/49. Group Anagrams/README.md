# 49. Group Anagrams

**Difficulty:** Medium · **Topics:** Array, Hash Table, String, Sorting · [LeetCode](https://leetcode.com/problems/group-anagrams/)

**Theory:** [GeeksforGeeks — Hashing](https://www.geeksforgeeks.org/dsa/hashing-data-structure/) · [Structy — Anagrams](https://structy.net/problems/anagrams)

## Problem
Given an array of strings `strs`, group the **anagrams** together. You can return the answer in **any order**.

**Example 1:**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Explanation:
- There is no string in strs that can be rearranged to form "bat".
- The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
- The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
```

**Example 2:**
```
Input: strs = [""]
Output: [[""]]
```

**Example 3:**
```
Input: strs = ["a"]
Output: [["a"]]
```

**Constraints:**
- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

## Approach
> [!IMPORTANT]
> **Key insight: all anagrams share the same letter counts, so use them as a hash map key.**
>
> Comparing every pair of strings is O(n²·k). Instead give every string a **canonical key** that is identical for all its anagrams, and bucket strings by key in a hash map.
>
> The key is the string's letter counts, e.g. `"eat"` → `"1#0#0#0#1#...#1#..."`. Counting is O(k) per string, faster than sorting the letters (O(k log k)), and the `#` separator keeps counts like `1,11` and `11,1` apart.

1. For each string, count its 26 letters and join the counts into a key.
2. Append the string to `groups[key]`.
3. Return the map's values.

## Walkthrough
`strs = ["eat","tea","tan","ate","nat","bat"]` (keys shown as their letter multiset)

| String | Key (letters) | groups after |
|---|---|---|
| eat | a,e,t | {aet: [eat]} |
| tea | a,e,t | {aet: [eat,tea]} |
| tan | a,n,t | {aet: [eat,tea], ant: [tan]} |
| ate | a,e,t | {aet: [eat,tea,ate], ant: [tan]} |
| nat | a,n,t | {aet: [...], ant: [tan,nat]} |
| bat | a,b,t | {aet: [...], ant: [...], abt: [bat]} |

Result: `[["eat","tea","ate"],["tan","nat"],["bat"]]` (any order is accepted).

## Complexity
- **Time:** O(n·k) — n strings of length up to k, each counted once (plus O(26) to build each key).
- **Space:** O(n·k) — the map stores every string and one key per group.
