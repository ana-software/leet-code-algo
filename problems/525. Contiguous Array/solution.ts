export function findMaxLength(nums: number[]): number {
    // balance -> first index where it appeared; the empty prefix has balance 0 at index -1
    const first = new Map<number, number>([[0, -1]]);
    let balance = 0; // (# of 1s) - (# of 0s) so far
    let best = 0;

    for (let i = 0; i < nums.length; i++) {
        balance += nums[i] === 1 ? 1 : -1;
        const j = first.get(balance);
        if (j !== undefined) {
            // Same balance at j and i -> nums[j+1..i] has equal 0s and 1s
            best = Math.max(best, i - j);
        } else {
            // Keep only the earliest index: it gives the longest subarray
            first.set(balance, i);
        }
    }

    return best;
};
