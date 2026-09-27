export function twoSum(nums: number[], target: number): number[] {
    // value -> index of every number seen so far
    const seen = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        // Look up before inserting, so an element is never paired with itself
        const j = seen.get(need);
        if (j !== undefined) return [j, i];
        seen.set(nums[i], i);
    }

    return []; // unreachable: exactly one solution is guaranteed
};
