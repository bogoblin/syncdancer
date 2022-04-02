class VideoTime {
    video;
    one;
    msPerBeat;
    offset;
    numberOfBeats;

    constructor(video, offset, numberOfBeats) {
        this.video = video;
        this.offset = offset;
        this.numberOfBeats = numberOfBeats;
        this.msPerBeat = 500;
        this.one = 0;
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
        return this.offset + this.timeToVideoFraction(time) * this.video.duration;
    }

    beat(time) {
        return Math.ceil(this.timeToVideoFraction(time)*this.numberOfBeats);
    }
}