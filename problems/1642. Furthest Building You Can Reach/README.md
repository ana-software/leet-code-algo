# 1642. Furthest Building You Can Reach

**Difficulty:** Medium · **Topics:** Array, Greedy, Heap (Priority Queue) · [LeetCode](https://leetcode.com/problems/furthest-building-you-can-reach/)

**Theory:** [Hello Interview — Heap](https://www.hellointerview.com/learn/code/heap/overview) · [Hello Interview — Greedy](https://www.hellointerview.com/learn/code/greedy/overview)

## Problem
You are given an integer array `heights` representing the heights of buildings, some `bricks`, and some `ladders`.

You start your journey from building `0` and move to the next building by possibly using bricks or ladders.

While moving from building `i` to building `i+1` (**0-indexed**),

- If the current building's height is **greater than or equal** to the next building's height, you do **not** need a ladder or bricks.
- If the current building's height is **less than** the next building's height, you can either use **one ladder** or `(h[i+1] - h[i])` **bricks**.

*Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.*

**Example 1:**

![Example 1](https://assets.leetcode.com/uploads/2020/10/27/q4.gif)

```
Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
```

**Example 2:**
```
Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7
```

**Example 3:**
```
Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3
```

**Constraints:**
- `1 <= heights.length <= 10^5`
- `1 <= heights[i] <= 10^6`
- `0 <= bricks <= 10^9`
- `0 <= ladders <= heights.length`

## Approach
Trying every choice of "bricks or ladder" for each climb is exponential. And a greedy that decides on the spot (e.g. "use bricks while you have them") fails, because a huge climb later may need the ladder you already used.

Key insight: a ladder covers any height, so it is best spent on the **largest** climbs. Bricks should pay for the rest. We don't know the future, but we can **decide provisionally and fix it later**:

1. Walk building by building. Skip steps that go down or stay level.
2. For each climb, **tentatively use a ladder**: push the climb onto a **min-heap** of climbs covered by ladders.
3. If the heap now has more climbs than we have ladders, take back the **smallest** one (`pop`) and pay for it with bricks instead. The heap then always holds the `ladders` largest climbs seen so far.
4. If bricks go negative, we can't make step `i → i+1`: return `i`.
5. If we finish the loop, return the last index.

## Walkthrough
`heights = [4,2,7,6,9,14,12]`, `bricks = 5`, `ladders = 1`

| i | step | climb | heap after push | over ladders? | bricks | Result |
|---|---|---|---|---|---|---|
| 0 | 4 → 2 | – | `[]` | – | 5 | free |
| 1 | 2 → 7 | 5 | `[5]` | no | 5 | ladder on 5 |
| 2 | 7 → 6 | – | `[5]` | – | 5 | free |
| 3 | 6 → 9 | 3 | `[3,5]` | yes → pop 3 | 5 − 3 = 2 | bricks on 3, ladder on 5 |
| 4 | 9 → 14 | 5 | `[5,5]` | yes → pop 5 | 2 − 5 = −3 | out of bricks → return `4` |

## Complexity
- **Time:** O(n log L) — where L = ladders; each climb does at most one push and one pop on a heap of size ≤ L + 1.
- **Space:** O(L) — the heap.
