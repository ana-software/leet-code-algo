export function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    // +1 for letters of s, -1 for letters of t: anagrams cancel out to all zeros
    const count = new Array<number>(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }

    return count.every((c) => c === 0);
};
