export class TopVotedCandidate {
    private times: number[];
    private leaders: number[]; // leaders[i] = who leads right after vote i

    constructor(persons: number[], times: number[]) {
        this.times = times;
        this.leaders = new Array(persons.length);

        const count = new Map<number, number>();
        let leader = -1;
        let best = 0;
        for (let i = 0; i < persons.length; i++) {
            const p = persons[i];
            const c = (count.get(p) ?? 0) + 1;
            count.set(p, c);
            // ">=" so a tie goes to the most recent vote
            if (c >= best) {
                best = c;
                leader = p;
            }
            this.leaders[i] = leader;
        }
    }

    q(t: number): number {
        // Find the last vote with times[i] <= t
        let lo = 0;
        let hi = this.times.length - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1; // upper mid so lo = mid makes progress
            if (this.times[mid] <= t) lo = mid;
            else hi = mid - 1;
        }
        return this.leaders[lo];
    }
}

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */
