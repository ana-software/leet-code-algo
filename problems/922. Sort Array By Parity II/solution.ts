export function sortArrayByParityII(nums: number[]): number[] {
    const n = nums.length;
    let j = 1; // scans odd indices for a misplaced even number

    // i scans even indices
    for (let i = 0; i < n; i += 2) {
        if (nums[i] % 2 === 1) {
            // An odd number at an even index means an even number sits at some odd index
            while (nums[j] % 2 === 1) j += 2;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }

    return nums;
};
