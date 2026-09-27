export function merge(intervals: number[][]): number[][] {
    // After sorting by start, overlapping intervals are adjacent
    intervals.sort((a, b) => a[0] - b[0]);

    const result: number[][] = [[...intervals[0]]];
    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        const last = result[result.length - 1];
        // Touching endpoints ([1,4],[4,5]) count as overlapping
        if (start <= last[1]) last[1] = Math.max(last[1], end);
        else result.push([start, end]);
    }

    return result;
};
