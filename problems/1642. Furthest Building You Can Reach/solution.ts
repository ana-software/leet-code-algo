// Small binary min-heap (TypeScript has no built-in priority queue)
class MinHeap {
    private data: number[] = [];

    get size(): number {
        return this.data.length;
    }

    push(val: number): void {
        const a = this.data;
        a.push(val);
        let i = a.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (a[parent] <= a[i]) break;
            [a[parent], a[i]] = [a[i], a[parent]];
            i = parent;
        }
    }

    pop(): number {
        const a = this.data;
        const top = a[0];
        const last = a.pop()!;
        if (a.length > 0) {
            a[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1;
                const r = l + 1;
                let smallest = i;
                if (l < a.length && a[l] < a[smallest]) smallest = l;
                if (r < a.length && a[r] < a[smallest]) smallest = r;
                if (smallest === i) break;
                [a[smallest], a[i]] = [a[i], a[smallest]];
                i = smallest;
            }
        }
        return top;
    }
}

export function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    // Holds the climbs we currently cover with ladders (the largest ones so far)
    const ladderClimbs = new MinHeap();

    for (let i = 0; i < heights.length - 1; i++) {
        const climb = heights[i + 1] - heights[i];
        if (climb <= 0) continue; // going down or level is free

        ladderClimbs.push(climb);
        // More climbs than ladders: pay for the smallest one with bricks instead
        if (ladderClimbs.size > ladders) {
            bricks -= ladderClimbs.pop();
            if (bricks < 0) return i; // can't reach building i + 1
        }
    }

    return heights.length - 1;
};
