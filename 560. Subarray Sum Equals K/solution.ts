export function subarraySum(nums: number[], k: number): number {
    // prefix sum -> how many times it has occurred so far.
    // The empty prefix (sum 0) lets subarrays starting at index 0 be counted.
    const seen = new Map<number, number>([[0, 1]]);
    let prefix = 0;
    let count = 0;

    for (const x of nums) {
        prefix += x;
        // nums[i+1..j] sums to k  <=>  an earlier prefix equals prefix - k
        count += seen.get(prefix - k) ?? 0;
        // Record after the lookup so the subarray is never empty
        seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
    }

    return count;
};
