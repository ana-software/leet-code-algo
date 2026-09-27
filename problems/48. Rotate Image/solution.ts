/**
 Do not return anything, modify matrix in-place instead.
 */
export function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // 1. Transpose: swap across the main diagonal (j > i so each pair swaps once)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // 2. Reverse each row: transpose + horizontal flip = 90° clockwise
    for (const row of matrix) row.reverse();
};
