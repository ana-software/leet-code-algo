export function findAnagrams(s: string, p: string): number[] {
    const n = s.length, m = p.length;
    const result: number[] = [];
    if (m > n) return result;

    // need[c] = count in p minus count in the current window
    const need = new Array<number>(26).fill(0);
    for (let i = 0; i < m; i++) need[p.charCodeAt(i) - 97]++;
    // diff = number of letters whose need is not zero
    let diff = need.filter((c) => c !== 0).length;

    // Apply a count change and keep diff in sync
    const update = (c: number, delta: number) => {
        if (need[c] === 0) diff++;
        need[c] += delta;
        if (need[c] === 0) diff--;
    };

    for (let i = 0; i < n; i++) {
        update(s.charCodeAt(i) - 97, -1);                 // s[i] enters
        if (i >= m) update(s.charCodeAt(i - m) - 97, +1); // s[i-m] leaves
        if (i >= m - 1 && diff === 0) result.push(i - m + 1);
    }

    return result;
};
