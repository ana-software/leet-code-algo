/**
 Do not return anything, modify nums in-place instead.
 */
export function sortColors(nums: number[]): void {
    // [0,low) = 0s, [low,mid) = 1s, (high,n-1] = 2s, [mid,high] = unknown
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--; // don't advance mid: the swapped-in value is unexamined
        }
    }
};
