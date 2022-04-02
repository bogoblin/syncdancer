const video = document.getElementById('main-video');
video.play();

let nextOne;
let fourBeats;

function setClicks(
    [one, two, three, four]
) {
    const oneBeat = (four - one) / 3;
    fourBeats = oneBeat*4;
    console.log(fourBeats);
    console.log(video.duration);
    const beatsInVideo = 4;
    video.playbackRate = 1000*video.duration / fourBeats;
    console.log(video.playbackRate);
    nextOne = one + fourBeats;
    syncNextOne()
}

function syncNextOne() {
    setTimeout(() => {
        video.fastSeek(0);
        console.log("one!");
        nextOne += fourBeats;
        syncNextOne();
    }, nextOne - performance.now());
}

let times = [0, 0, 0, 0];
let curTime = 0;
document.addEventListener('keydown', ev => {
    times[curTime] = performance.now();
    curTime += 1;
    console.log(curTime);
    if (curTime === 4) {
        curTime = 0;
        setClicks(times);
        console.log("I did it!");
    }
});