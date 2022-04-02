class VideoTime {
    one;
    msPerBeat;
    video;

    constructor(video) {
        this.video = video;
        this.msPerBeat = 500;
        this.one = performance.now();
    }

    setStartAndTime(start, msPerBeat) {
        this.one = start;
        this.msPerBeat = msPerBeat;
    }

    msPerLoop() {
        return this.msPerBeat * 4;
    }

    timeToVideoFraction(time) {
        const timeSinceOne = time - this.one;
        const numberOfLoops = Math.floor(timeSinceOne/this.msPerLoop());
        const timeSinceLastOne = timeSinceOne - numberOfLoops*this.msPerLoop();
        return timeSinceLastOne/this.msPerLoop();
    }

    timeToVideoTime(time) {
        return this.timeToVideoFraction(time) * this.video.duration;
    }
}