class VideoTime {
    one;
    msPerBeat;
    offset;
    duration;
    numberOfBeats;

    constructor(offset, duration, numberOfBeats) {
        this.offset = offset;
        this.duration = duration;
        this.numberOfBeats = numberOfBeats;
        this.msPerBeat = 500;
        this.one = performance.now();
    }

    setStartAndTime(start, msPerBeat) {
        this.one = start;
        this.msPerBeat = msPerBeat;
    }

    msPerLoop() {
        return this.msPerBeat * this.numberOfBeats;
    }

    timeToVideoFraction(time) {
        const timeSinceOne = time - this.one;
        const numberOfLoops = Math.floor(timeSinceOne/this.msPerLoop());
        const timeSinceLastOne = timeSinceOne - numberOfLoops*this.msPerLoop();
        return timeSinceLastOne/this.msPerLoop();
    }

    timeToVideoTime(time) {
        return this.offset + this.timeToVideoFraction(time) * this.duration;
    }
}