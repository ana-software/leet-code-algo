export function search(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) lo = mid + 1; // target can only be to the right
        else hi = mid - 1;                    // target can only be to the left
    }

    return -1;
};
