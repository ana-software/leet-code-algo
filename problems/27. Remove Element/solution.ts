export function removeElement(nums: number[], val: number): number {
    let k = 0; // write pointer: next slot for a kept value

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            // k <= i, so this never overwrites an unread element
            nums[k++] = nums[i];
        }
    }

    return k;
};
