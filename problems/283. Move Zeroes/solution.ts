/**
 Do not return anything, modify nums in-place instead.
 */
export function moveZeroes(nums: number[]): void {
    // write: slot for the next non-zero element
    let write = 0;
    for (let read = 0; read < nums.length; read++) {
        if (nums[read] !== 0) {
            // Swap only when needed; the zero at `write` moves back to `read`
            if (read !== write) [nums[write], nums[read]] = [nums[read], nums[write]];
            write++;
        }
    }
};
