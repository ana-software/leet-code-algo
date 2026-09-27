export function findMaxConsecutiveOnes(nums: number[]): number {
    let cur = 0;  // length of the current run of 1s
    let best = 0;

    for (const x of nums) {
        if (x === 1) {
            cur++;
            // Update on every 1 so a run ending at the last index is counted
            if (cur > best) best = cur;
        } else {
            cur = 0; // a 0 breaks the run
        }
    }

    return best;
};
