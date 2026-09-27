export function minEatingSpeed(piles: number[], h: number): number {
    // Hours needed at speed k: each pile takes ceil(pile / k) hours
    const hoursAt = (k: number): number => {
        let hours = 0;
        for (const p of piles) hours += Math.ceil(p / k);
        return hours;
    };

    // Speed max(piles) always works (one hour per pile, and h >= piles.length)
    let lo = 1;
    let hi = Math.max(...piles);

    // Find the smallest k with hoursAt(k) <= h. Faster speed never needs more hours.
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (hoursAt(mid) <= h) hi = mid; // mid works, maybe something slower does too
        else lo = mid + 1;               // too slow
    }

    return lo;
};
