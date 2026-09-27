export function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const answer = new Array<number>(n);

    // Left pass: answer[i] = product of nums[0..i-1]
    answer[0] = 1;
    for (let i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1];

    // Right pass: multiply in the product of nums[i+1..n-1]
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }

    return answer;
};
