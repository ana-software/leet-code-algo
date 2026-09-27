export function findMaxAverage(nums: number[], k: number): number {
    // Sum of the first window
    let sum = 0;
    for (let i = 0; i < k; i++) sum += nums[i];

    let best = sum;
    for (let i = k; i < nums.length; i++) {
        // Slide right: nums[i] enters, nums[i - k] leaves
        sum += nums[i] - nums[i - k];
        if (sum > best) best = sum;
    }

    // Same length for every window, so max sum <=> max average: divide once
    return best / k;
};
