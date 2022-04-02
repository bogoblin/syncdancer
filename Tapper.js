class Tapper {
    taps;
    currentTap;

    constructor() {
        this.taps = [0, 500, 1000, 1500];
        this.currentTap = 0;
    }

    tap() {
        const now = performance.now();
        const timeSinceLastTap = now-this.lastTap();
        const cycleLength = this.averageTimeBetweenTaps()*4;
        if (timeSinceLastTap > cycleLength) {
            const cyclesSinceLastTap = Math.floor(timeSinceLastTap/cycleLength);
            if (cyclesSinceLastTap > 8) {
                this.currentTap = 0;
            }
            const toAdd = cycleLength * cyclesSinceLastTap;
            for (let i=0; i<this.taps.length; i++) {
                this.taps[i] += toAdd;
            }
        }

        this.taps[this.currentTap] = now;
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

    multiply(factor) {
        for (let i=0; i<this.taps.length; i++) {
            this.taps[i] *= factor;
        }
    }
}