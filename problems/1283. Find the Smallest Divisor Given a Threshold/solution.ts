export function smallestDivisor(nums: number[], threshold: number): number {
    // Sum of ceil(num / d) over the array
    const sumAt = (d: number): number => {
        let sum = 0;
        for (const x of nums) sum += Math.ceil(x / d);
        return sum;
    };

    // d = max(nums) gives a sum of nums.length <= threshold, so it always works
    let lo = 1;
    let hi = Math.max(...nums);

    // A bigger divisor never makes the sum bigger: find the first d that fits
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (sumAt(mid) <= threshold) hi = mid;
        else lo = mid + 1;
    }

    return lo;
};
