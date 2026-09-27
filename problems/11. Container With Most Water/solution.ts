export function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let best = 0;

    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        if (area > best) best = area;
        // The shorter line limits every narrower container it could form,
        // so it can never beat the current area: discard it
        if (height[left] < height[right]) left++;
        else right--;
    }

    return best;
};
