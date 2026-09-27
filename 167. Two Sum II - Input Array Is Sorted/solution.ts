export function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1]; // answer is 1-indexed
        // Sum too small: numbers[left] can't pair with anything, so drop it.
        // Sum too large: numbers[right] can't pair with anything, so drop it.
        if (sum < target) left++;
        else right--;
    }

    return []; // unreachable: exactly one solution is guaranteed
};
