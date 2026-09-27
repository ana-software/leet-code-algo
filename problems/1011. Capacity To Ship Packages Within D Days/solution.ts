export function shipWithinDays(weights: number[], days: number): number {
    // Days needed with a given capacity: fill each day greedily, in order
    const daysAt = (cap: number): number => {
        let needed = 1;
        let load = 0;
        for (const w of weights) {
            if (load + w > cap) { // doesn't fit: start a new day
                needed++;
                load = 0;
            }
            load += w;
        }
        return needed;
    };

    // The ship must carry the heaviest package; the total weight ships in one day
    let lo = Math.max(...weights);
    let hi = weights.reduce((a, b) => a + b, 0);

    // More capacity never needs more days: find the first capacity that fits
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (daysAt(mid) <= days) hi = mid;
        else lo = mid + 1;
    }

    return lo;
};
