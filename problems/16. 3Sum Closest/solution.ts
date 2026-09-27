export function threeSumClosest(nums: number[], target: number): number {
    const n = nums.length;
    nums.sort((a, b) => a - b);
    let best = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < n - 2; i++) {
        let lo = i + 1;
        let hi = n - 1;
        while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];
            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;

            if (sum < target) {
                lo++; // need a bigger sum
            } else if (sum > target) {
                hi--; // need a smaller sum
            } else {
                return sum; // exact match: can't get closer
            }
        }
    }

    return best;
};
