# 1011. Capacity To Ship Packages Within D Days

**Difficulty:** Medium · **Topics:** Array, Binary Search · [LeetCode](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/minimum-shipping-capacity)

## Problem
A conveyor belt has packages that must be shipped from one port to another within `days` days.

The `i`th package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.

**Example 1:**
```
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
```

**Example 2:**
```
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
```

**Example 3:**
```
Input: weights = [1,2,3,1,1], days = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1
```

**Constraints:**
- `1 <= days <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`

## Approach
For a fixed capacity, the number of days is easy to count greedily: load packages in order and start a new day whenever the next one doesn't fit. That costs O(n). Trying every capacity one by one could take up to 2.5·10⁷ tries, far too slow.

Key insight (**binary search on the answer**): a bigger ship never needs more days. So "can we ship within `days` at capacity `c`?" is *no, …, no, yes, …, yes*, and we want the first *yes*.

1. The capacity is at least `max(weights)` (every package must fit) and at most `sum(weights)` (everything in one day).
2. For `mid`, count the days greedily.
3. If `daysAt(mid) <= days`, `mid` works; try smaller: `hi = mid`. Otherwise `lo = mid + 1`.
4. When `lo === hi`, return it.

## Walkthrough
`weights = [1..10]`, `days = 5`: `lo = 10` (heaviest), `hi = 55` (total)

| Step | lo | hi | mid | Greedy days at mid | Action |
|---|---|---|---|---|---|
| 1 | 10 | 55 | 32 | `[1..7] [8,9,10]` = 2 | ≤ 5 → `hi = 32` |
| 2 | 10 | 32 | 21 | `[1..6] [7,8] [9,10]` = 3 | ≤ 5 → `hi = 21` |
| 3 | 10 | 21 | 15 | `[1..5] [6,7] [8] [9] [10]` = 5 | ≤ 5 → `hi = 15` |
| 4 | 10 | 15 | 12 | `[1..4] [5,6] [7] [8] [9] [10]` = 6 | > 5 → `lo = 13` |
| 5 | 13 | 15 | 14 | `[1..4] [5,6] [7] [8] [9] [10]` = 6 | > 5 → `lo = 15` |
| 6 | 15 | 15 | – | – | return `15` |

## Complexity
- **Time:** O(n · log S) — where S = sum(weights); each binary-search step does one O(n) greedy pass.
- **Space:** O(1) — a few variables.
