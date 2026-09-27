export function romanToInt(s: string): number {
    const value: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const cur = value[s[i]];
        // A smaller symbol before a larger one is subtracted (IV, IX, XL, XC, CD, CM)
        if (i + 1 < s.length && cur < value[s[i + 1]]) total -= cur;
        else total += cur;
    }
    return total;
};
