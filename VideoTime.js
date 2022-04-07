class VideoTime {
    video;
    offset;
    loopLength;
    numberOfBeats;

    fraction;
    lastUpdate;

    constructor(video, offset, loopLength, numberOfBeats) {
        this.video = video;
        this.offset = offset;
        this.loopLength = loopLength;
        this.numberOfBeats = numberOfBeats;

        this.fraction = 0;
        this.lastUpdate = 0;
    }

    update(time, nextBeat) {
        if (this.lastUpdate === 0)
            this.lastUpdate = time;

        const timeDiff = time - this.lastUpdate;
        this.lastUpdate = time;

        const timeUntilNextBeat = nextBeat - time;
        const fractionUntilNextBeat = this.nextBeatFraction() - this.fraction;

        // console.log({
        //     fractionUntilNextBeat,
        //     timeUntilNextBeat,
        //     timeDiff
        // });
        const fracDiff = timeDiff*(fractionUntilNextBeat/timeUntilNextBeat);
        this.fraction += fracDiff;
        if (this.fraction > 1)
            this.fraction -= Math.floor(this.fraction);

        this.video.currentTime = this.offset + this.fraction * this.loopLength;
    }

    nextBeatFraction() {
        return this.beat()/this.numberOfBeats;
    }

    beat() {
        return Math.floor(this.fraction*this.numberOfBeats) + 1;
    }
}