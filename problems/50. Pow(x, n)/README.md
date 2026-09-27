# 50. Pow(x, n)

**Difficulty:** Medium · **Topics:** Math, Recursion · [LeetCode](https://leetcode.com/problems/powx-n/)

## Problem
Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates `x` raised to the power `n` (i.e., `x^n`).

**Example 1:**
```
Input: x = 2.00000, n = 10
Output: 1024.00000
```

**Example 2:**
```
Input: x = 2.10000, n = 3
Output: 9.26100
```

**Example 3:**
```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
```

**Constraints:**
- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31-1`
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- `-10^4 <= x^n <= 10^4`

## Approach
Multiplying `x` by itself `n` times is O(n). With `n` up to about 2·10⁹, that is too slow.

Key insight (**binary / fast exponentiation**): write `n` in binary. For example, `10 = 1010₂ = 8 + 2`, so `x^10 = x^8 · x^2`. The powers `x, x², x⁴, x⁸, …` come from squaring the previous one, so we only need about log₂ n squarings.

1. If `n < 0`, use `x^n = (1/x)^|n|`. In JS, `|−2^31|` is still exact. (In languages with 32-bit ints, negating `−2^31` overflows.)
2. `result = 1`, `base = x`, `exp = |n|`.
3. While `exp > 0`:
   - If the lowest bit of `exp` is 1, multiply `result` by `base`.
   - Square `base` (it becomes `x^(2^(k+1))`) and halve `exp` (drop the lowest bit).
4. Return `result`.

## Walkthrough
`x = 2`, `n = 10` (binary `1010`)

| Step | exp (binary) | lowest bit | result | base after squaring |
|---|---|---|---|---|
| 1 | 10 (`1010`) | 0 | 1 | 4 |
| 2 | 5 (`101`) | 1 | 1 · 4 = 4 | 16 |
| 3 | 2 (`10`) | 0 | 4 | 256 |
| 4 | 1 (`1`) | 1 | 4 · 256 = 1024 | 65536 |
| 5 | 0 | – | return `1024` | – |

## Complexity
- **Time:** O(log |n|) — one loop step per bit of `n`.
- **Space:** O(1) — iterative, no recursion stack.
