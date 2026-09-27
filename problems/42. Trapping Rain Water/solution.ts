export function trap(height: number[]): number {
    let l = 0;
    let r = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (l < r) {
        if (height[l] < height[r]) {
            // A taller bar exists on the right, so leftMax is the limiting wall for l
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
            l++;
        } else {
            // A bar at least as tall exists on the left, so rightMax limits r
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
            r--;
        }
    }

    return water;
};
