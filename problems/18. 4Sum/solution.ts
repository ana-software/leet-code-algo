export function fourSum(nums: number[], target: number): number[][] {
    const n = nums.length;
    const result: number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // same first number -> same quadruplets

        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue; // same second number

            let lo = j + 1;
            let hi = n - 1;
            while (lo < hi) {
                // Up to 4e9 in magnitude: fine for JS numbers (exact up to 2^53)
                const sum = nums[i] + nums[j] + nums[lo] + nums[hi];
                if (sum < target) {
                    lo++;
                } else if (sum > target) {
                    hi--;
                } else {
                    result.push([nums[i], nums[j], nums[lo], nums[hi]]);
                    lo++;
                    hi--;
                    // Skip repeated values so the same pair isn't recorded twice
                    while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
                    while (lo < hi && nums[hi] === nums[hi + 1]) hi--;
                }
            }
        }
    }

    return result;
};
