const video = document.getElementById('main-video');
video.muted = true;
video.preservesPitch = false;
video.playbackRate = 0;

const videoTime = new VideoTime(video);
const tapper = new Tapper();

document.addEventListener('keydown', ev => {
    const msPerBeat = tapper.tap();
    const start = tapper.one();
    videoTime.setStartAndTime(start, msPerBeat);
});

function doFrame() {
    requestAnimationFrame((t) => {
        video.fastSeek(videoTime.timeToVideoTime(t));
        doFrame();
    });
}
doFrame();