export function mySqrt(x: number): number {
    if (x < 2) return x; // sqrt(0) = 0, sqrt(1) = 1

    // Find the largest m with m * m <= x. The answer is at most x / 2 for x >= 2.
    let lo = 1;
    let hi = Math.floor(x / 2);

    while (lo < hi) {
        // Upper mid, so lo = mid always makes progress
        const mid = lo + Math.ceil((hi - lo) / 2);
        // mid <= x / mid is the same as mid * mid <= x, without a huge product
        if (mid <= Math.floor(x / mid)) lo = mid;
        else hi = mid - 1;
    }

    return lo;
};
