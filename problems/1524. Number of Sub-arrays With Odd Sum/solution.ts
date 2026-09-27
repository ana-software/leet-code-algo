export function numOfSubarrays(arr: number[]): number {
    const MOD = 1_000_000_007;
    let even = 1; // the empty prefix (sum 0) is even
    let odd = 0;
    let parity = 0; // parity of the running prefix sum
    let count = 0;

    for (const x of arr) {
        parity = (parity + x) % 2;
        if (parity === 1) {
            // odd prefix - even prefix = odd subarray sum
            count = (count + even) % MOD;
            odd++;
        } else {
            // even prefix - odd prefix = odd subarray sum
            count = (count + odd) % MOD;
            even++;
        }
    }

    return count;
};
