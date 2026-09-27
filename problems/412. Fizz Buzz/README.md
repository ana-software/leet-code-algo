# 412. Fizz Buzz

**Difficulty:** Easy · **Topics:** Math, String, Simulation · [LeetCode](https://leetcode.com/problems/fizz-buzz/)

**Theory:** [GeeksforGeeks — Fizz Buzz](https://www.geeksforgeeks.org/dsa/fizz-buzz-implementation/) · [Structy — Fizz Buzz](https://structy.net/problems/fizz-buzz)

## Problem
Given an integer `n`, return *a string array* `answer` *(**1-indexed**) where*:

- `answer[i] == "FizzBuzz"` if `i` is divisible by `3` and `5`.
- `answer[i] == "Fizz"` if `i` is divisible by `3`.
- `answer[i] == "Buzz"` if `i` is divisible by `5`.
- `answer[i] == i` (as a string) if none of the above conditions are true.

**Example 1:**
```
Input: n = 3
Output: ["1","2","Fizz"]
```

**Example 2:**
```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

**Example 3:**
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

**Constraints:**
- `1 <= n <= 10^4`

## Approach
> [!IMPORTANT]
> **Key insight: build the string by concatenation, so `"FizzBuzz"` comes out automatically.**
>
> A direct simulation. The only trap is the order of the checks: a number divisible by both 3 and 5 must print `"FizzBuzz"`, so either test that case first or build the string by concatenation.

1. For `i` from 1 to `n`: start with an empty string.
2. Append `"Fizz"` if `i % 3 == 0`, then `"Buzz"` if `i % 5 == 0`.
3. If the string is still empty, use `String(i)`.

Concatenation handles `"FizzBuzz"` automatically and extends cleanly if more rules are added.

## Walkthrough
`n = 3`

| i | i % 3 | i % 5 | answer[i] |
|---|---|---|---|
| 1 | 1 | 1 | "1" |
| 2 | 2 | 2 | "2" |
| 3 | 0 | 3 | "Fizz" |

Result: `["1","2","Fizz"]`.

## Complexity
- **Time:** O(n) — constant work per number.
- **Space:** O(1) extra — apart from the n-element output.
