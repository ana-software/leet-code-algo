export function maxSubArray(nums: number[]): number {
    // Start from the first element, not 0: the subarray must be non-empty,
    // so an all-negative array must return its largest (least negative) value
    let cur = nums[0];
    let best = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Either extend the best subarray ending at i - 1, or start fresh at i
        cur = Math.max(nums[i], cur + nums[i]);
        best = Math.max(best, cur);
    }

    return best;
};
