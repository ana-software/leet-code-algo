export function maxSideLength(mat: number[][], threshold: number): number {
    const m = mat.length;
    const n = mat[0].length;

    // P[i][j] = sum of mat[0..i-1][0..j-1]; the extra row/column of zeros
    // removes edge checks
    const P: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    let best = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            P[i][j] = mat[i - 1][j - 1] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1];

            // Only a square one bigger than the best so far can improve the answer.
            // Test the one whose bottom-right corner is (i, j).
            const k = best + 1;
            if (i >= k && j >= k) {
                const sum = P[i][j] - P[i - k][j] - P[i][j - k] + P[i - k][j - k];
                if (sum <= threshold) best = k;
            }
        }
    }

    return best;
};
