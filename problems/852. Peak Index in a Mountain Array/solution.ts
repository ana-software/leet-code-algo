export function peakIndexInMountainArray(arr: number[]): number {
    let lo = 0;
    let hi = arr.length - 1;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        // Still climbing: the peak is strictly to the right of mid
        if (arr[mid] < arr[mid + 1]) lo = mid + 1;
        // Going down (or at the peak): the peak is mid or to its left
        else hi = mid;
    }

    return lo;
};
