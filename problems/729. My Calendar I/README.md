# 729. My Calendar I

**Difficulty:** Medium · **Topics:** Array, Binary Search, Design, Segment Tree, Ordered Set · [LeetCode](https://leetcode.com/problems/my-calendar-i/)

**Theory:** [Hello Interview — Binary Search](https://www.hellointerview.com/learn/code/binary-search/overview) · [Hello Interview — Intervals](https://www.hellointerview.com/learn/code/intervals/overview) · [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/dsa/binary-search/) · [GeeksforGeeks — Overlapping Intervals](https://www.geeksforgeeks.org/dsa/merging-intervals/)

## Problem
You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **double booking**.

A **double booking** happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers `startTime` and `endTime` that represents a booking on the half-open interval `[startTime, endTime)`, the range of real numbers `x` such that `startTime <= x < endTime`.

Implement the `MyCalendar` class:

- `MyCalendar()` Initializes the calendar object.
- `boolean book(int startTime, int endTime)` Returns `true` if the event can be added to the calendar successfully without causing a **double booking**. Otherwise, return `false` and do not add the event to the calendar.

**Example 1:**
```
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
```

**Constraints:**
- `0 <= start < end <= 10^9`
- At most `1000` calls will be made to `book`.

## Approach
The simple way is to compare the new event with every booked one: `[s1, e1)` and `[s2, e2)` overlap exactly when `s1 < e2 && s2 < e1`. That is O(n) per call.

> [!IMPORTANT]
> **Key insight: keep the bookings sorted by start; a new event can only clash with its two neighbours.**
>
> Better: keep the booked events **sorted by start**. They never overlap, so their ends are sorted too, and the new event can only clash with its two **neighbours** in that order:

1. Binary search for `idx`, the first booked event with `start >= startTime`.
2. The event just before (`idx - 1`) must end by `startTime`: if its `end > startTime`, it's a clash.
3. The event at `idx` must start at or after `endTime`: if its `start < endTime`, it's a clash.
4. If neither clashes, insert `[startTime, endTime]` at `idx` and return `true`.

Finding the spot is O(log n). The `splice` insert still shifts elements, which is O(n) in the worst case but very fast in practice. A balanced tree (e.g. Java's `TreeMap`) would make the insert O(log n) too, but TypeScript doesn't have one built in.

## Walkthrough
`book(10,20)`, `book(15,25)`, `book(20,30)`

| Call | events before | idx | before idx | at idx | Result | events after |
|---|---|---|---|---|---|---|
| book(10, 20) | `[]` | 0 | – | – | `true` | `[[10,20]]` |
| book(15, 25) | `[[10,20]]` | 1 | `[10,20]`: 20 > 15 → clash | – | `false` | `[[10,20]]` |
| book(20, 30) | `[[10,20]]` | 1 | `[10,20]`: 20 > 20? no | – | `true` | `[[10,20],[20,30]]` |

Output: `[null, true, false, true]`

## Complexity
- **Time:** O(log n) to find the spot plus O(n) for the array insert, per `book` call; O(n²) worst case over n calls (n ≤ 1000).
- **Space:** O(n) — the booked events.
