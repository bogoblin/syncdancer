class Tapper {
    taps;
    currentTap;

    constructor() {
        this.taps = [0, 500, 1000, 1500];
        this.currentTap = 0;
    }

    tap() {
        this.taps[this.currentTap] = performance.now();
        this.currentTap += 1;
        if (this.currentTap === this.taps.length) {
            this.currentTap = 0;
        }
        return this.averageTimeBetweenTaps();
    }

    lastTap() {
        const n = this.taps.length;
        return this.taps[(this.currentTap-1+n)%n];
    }

    firstTap() {
        return this.taps[this.currentTap];
    }

    one() {
        return this.taps[0];
    }

    averageTimeBetweenTaps() {
        const diff = this.lastTap() - this.firstTap();
        return diff/(this.taps.length-1);
    }
}