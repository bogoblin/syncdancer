class Tapper {
    taps;
    nextTap;

    msPerBeat;
    lastBeat;
    nextBeat;

    constructor() {
        this.resetTaps();

        this.msPerBeat = 500;
        this.lastBeat = performance.now();
        this.whenNextBeat(this.lastBeat);
    }

    whenNextBeat(time) {
        this.nextBeat = this.lastBeat + this.msPerBeat;
        if (time > this.nextBeat) {
            this.lastBeat += this.msPerBeat;
            this.nextBeat = this.lastBeat + this.msPerBeat;
        }
        if (time > this.nextBeat) {
            this.lastBeat = time;
            return this.whenNextBeat(time);
        }
        return this.nextBeat;
    }

    resetTaps() {
        this.taps = [0, 0, 0, 0];
        this.nextTap = 0;
    }

    tap(time) {
        const timeSinceLastTap = time - this.lastTap();
        if (timeSinceLastTap > 2000) this.resetTaps();

        this.taps[this.nextTap] = time;
        this.nextTap+=1;
        if (this.nextTap === this.taps.length) {
            this.msPerBeat = (this.lastTap() - this.taps[0])/(this.taps.length-1);
            this.lastBeat = time;
            this.resetTaps();
        }
    }

    lastTap() {
        if (this.nextTap === 0) return 0;
        return this.taps[this.nextTap-1];
    }

    multiply(factor) {
        this.msPerBeat *= factor;
    }
}