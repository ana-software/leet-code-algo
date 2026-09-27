export function intersect(nums1: number[], nums2: number[]): number[] {
    // How many copies of each value nums1 can still "give"
    const count = new Map<number, number>();
    for (const x of nums1) count.set(x, (count.get(x) ?? 0) + 1);

    const result: number[] = [];
    for (const x of nums2) {
        const c = count.get(x) ?? 0;
        if (c > 0) {
            // Spend one copy so each value appears min(count1, count2) times
            result.push(x);
            count.set(x, c - 1);
        }
    }

    return result;
};
