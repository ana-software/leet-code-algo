export function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0;
    let sum = 0;
    let best = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        // All values are positive, so shrinking from the left only lowers the sum:
        // keep shrinking while the window is still valid to find the shortest one
        while (sum >= target) {
            best = Math.min(best, right - left + 1);
            sum -= nums[left++];
        }
    }

    return best === Infinity ? 0 : best; // 0 when no window reaches target
};
