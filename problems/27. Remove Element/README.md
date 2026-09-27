# 27. Remove Element

**Difficulty:** Easy · **Topics:** Array, Two Pointers · [LeetCode](https://leetcode.com/problems/remove-element/)

**Theory:** [Hello Interview — Two Pointers](https://www.hellointerview.com/learn/code/two-pointers/move-zeroes) · [GeeksforGeeks — Two Pointers](https://www.geeksforgeeks.org/dsa/two-pointers-technique/)

## Problem
Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm). The order of the elements may be changed. Then return *the number of elements in* `nums` *which are not equal to* `val`.

Consider the number of elements in `nums` which are not equal to `val` be `k`, to get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the elements which are not equal to `val`. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be **accepted**.

**Example 1:**
```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Example 2:**
```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Constraints:**
- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

## Approach
> [!IMPORTANT]
> **Key insight: copy the kept values forward with a write pointer instead of deleting.**
>
> Deleting each `val` with `splice` shifts the rest of the array every time, which is O(n²). Instead, use a **read pointer** and a **write pointer** (the same idea as Move Zeroes).

1. `k` is the write pointer: the next slot for a value we keep. Start it at 0.
2. Scan every element with the read pointer. If it isn't `val`, copy it to `nums[k]` and increment `k`.
3. After the scan, `nums[0..k-1]` holds exactly the kept values, in their original order. Return `k`.

`k` never passes the read pointer, so we never overwrite a value we haven't read yet.

## Walkthrough
`nums = [3,2,2,3]`, `val = 3`

| read i | nums[i] | Keep? | Write | k after | nums |
|---|---|---|---|---|---|
| 0 | 3 | no | — | 0 | [3,2,2,3] |
| 1 | 2 | yes | nums[0] = 2 | 1 | [2,2,2,3] |
| 2 | 2 | yes | nums[1] = 2 | 2 | [2,2,2,3] |
| 3 | 3 | no | — | 2 | [2,2,2,3] |

Result: `k = 2`, first two elements `[2,2]`.

## Complexity
- **Time:** O(n) — one pass over the array.
- **Space:** O(1) — only the write pointer.
