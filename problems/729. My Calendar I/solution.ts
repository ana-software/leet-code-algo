export class MyCalendar {
    // Booked events, sorted by start. They never overlap, so ends are sorted too.
    private events: [number, number][];

    constructor() {
        this.events = [];
    }

    book(startTime: number, endTime: number): boolean {
        // idx = first event that starts at or after startTime
        let lo = 0;
        let hi = this.events.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (this.events[mid][0] < startTime) lo = mid + 1;
            else hi = mid;
        }

        // Only the neighbours can overlap: the event before must end by startTime,
        // the event after must start at or after endTime (intervals are half-open).
        if (lo > 0 && this.events[lo - 1][1] > startTime) return false;
        if (lo < this.events.length && this.events[lo][0] < endTime) return false;

        this.events.splice(lo, 0, [startTime, endTime]);
        return true;
    }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
