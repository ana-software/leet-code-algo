# 875. Koko Eating Bananas

**Difficulty:** Medium · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/koko-eating-bananas/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [GeeksforGeeks — Binary Search on Answer](https://www.geeksforgeeks.org/dsa/binary-search-on-answer-tutorial-with-problems/)

## Problem
Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return *the minimum integer* `k` *such that she can eat all the bananas within* `h` *hours*.

**Example 1:**
```
Input: piles = [3,6,7,11], h = 8
Output: 4
```

**Example 2:**
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

**Example 3:**
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

**Constraints:**
- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Approach
At speed `k`, a pile of `p` bananas takes `ceil(p / k)` hours, so checking one speed costs O(n). Trying every speed from 1 up to `max(piles)` (up to 10⁹) is far too slow.

Key insight (**binary search on the answer**): a faster speed never needs more hours. So "can she finish at speed `k`?" is *no, no, …, no, yes, yes, …*, and we want the first *yes*.

1. Search speeds in `[1, max(piles)]`. At `max(piles)` every pile takes one hour, and `h >= piles.length`, so that speed always works.
2. For `mid`, compute `hours = Σ ceil(p / mid)`.
3. If `hours <= h`, `mid` works; a slower speed might too: `hi = mid`. Otherwise it's too slow: `lo = mid + 1`.
4. When `lo === hi`, that's the minimum speed.

## Walkthrough
`piles = [3,6,7,11]`, `h = 8`

| Step | lo | hi | mid | hours at mid | Action |
|---|---|---|---|---|---|
| 1 | 1 | 11 | 6 | 1+1+2+2 = 6 | 6 ≤ 8 → `hi = 6` |
| 2 | 1 | 6 | 3 | 1+2+3+4 = 10 | 10 > 8 → `lo = 4` |
| 3 | 4 | 6 | 5 | 1+2+2+3 = 8 | 8 ≤ 8 → `hi = 5` |
| 4 | 4 | 5 | 4 | 1+2+2+3 = 8 | 8 ≤ 8 → `hi = 4` |
| 5 | 4 | 4 | – | – | return `4` |

## Complexity
- **Time:** O(n · log M) — where M = max(piles); about 30 binary-search steps, each summing over n piles.
- **Space:** O(1) — a few variables.
