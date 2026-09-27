export function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const s of strs) {
        // Letter counts are identical for all anagrams: use them as the key
        const count = new Array<number>(26).fill(0);
        for (let i = 0; i < s.length; i++) count[s.charCodeAt(i) - 97]++;
        const key = count.join("#"); // separator keeps e.g. [1,11] and [11,1] distinct

        const group = groups.get(key);
        if (group) group.push(s);
        else groups.set(key, [s]);
    }

    return [...groups.values()];
};
