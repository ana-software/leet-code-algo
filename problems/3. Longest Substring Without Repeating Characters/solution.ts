export function lengthOfLongestSubstring(s: string): number {
    // char -> last index where it appeared
    const last = new Map<string, number>();
    let left = 0;
    let best = 0;

    for (let right = 0; right < s.length; right++) {
        const prev = last.get(s[right]);
        // Duplicate inside the current window: jump left just past it
        if (prev !== undefined && prev >= left) left = prev + 1;
        last.set(s[right], right);
        best = Math.max(best, right - left + 1);
    }

    return best;
};
