# 121. Best Time to Buy and Sell Stock

**Difficulty:** Easy · **Topics:** Array, Dynamic Programming · [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

**Theory:** [Hello Interview — Greedy (Best Time to Buy and Sell Stock)](https://www.hellointerview.com/learn/code/greedy/best-time-to-buy-and-sell-stock) · [GeeksforGeeks — Greedy](https://www.geeksforgeeks.org/dsa/greedy-algorithms/)

## Problem
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i^th` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

**Constraints:**
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Approach
> [!IMPORTANT]
> **Key insight: the best day to buy before selling on day `i` is the cheapest day so far, so track the running minimum.**
>
> Trying every buy/sell pair is O(n²), up to 5·10⁹ pairs. But if we decide to sell on day `i`, the best buy day is simply the **cheapest day before it**. So one pass is enough, as long as we carry the minimum price seen so far.

1. `minPrice = prices[0]`, `best = 0`.
2. For each later price `p`: update `best = max(best, p − minPrice)`, then `minPrice = min(minPrice, p)`.
3. Return `best` (stays 0 if prices only fall).

## Walkthrough
`prices = [7,1,5,3,6,4]`

| day | price | minPrice (before) | profit if sold | best |
|---|---|---|---|---|
| 0 | 7 | — | — | 0 |
| 1 | 1 | 7 | -6 | 0 |
| 2 | 5 | 1 | 4 | 4 |
| 3 | 3 | 1 | 2 | 4 |
| 4 | 6 | 1 | 5 | 5 |
| 5 | 4 | 1 | 3 | 5 |

Result: `5`.

## Complexity
- **Time:** O(n) — one pass.
- **Space:** O(1) — two variables.
