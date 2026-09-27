export function searchInsert(nums: number[], target: number): number {
    // Search for the first index whose value is >= target (the "lower bound").
    // hi = nums.length so that "insert after everything" is a valid answer.
    let lo = 0;
    let hi = nums.length;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] < target) lo = mid + 1; // mid and everything left of it is too small
        else hi = mid;                        // mid could be the answer, keep it
    }

    return lo;
};
