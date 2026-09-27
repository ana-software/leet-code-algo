export function findMin(nums: number[]): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        // mid is bigger than the last element: the drop (and the minimum)
        // is somewhere to the right of mid
        if (nums[mid] > nums[hi]) lo = mid + 1;
        // mid..hi is sorted, so the minimum is mid or to its left
        else hi = mid;
    }

    return nums[lo];
};
