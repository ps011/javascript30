/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */

function togglePlay () {

    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton (e) {
    toggle.textContent = e.target.paused ? '►' : '❚ ❚';
}

function skip (e) {
    console.log( parseFloat(e.target.dataset.skip))
    video.currentTime += parseFloat(e.target.dataset.skip);
    console.log(video.currentTime)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


/* Hook up the event listeners */

video.addEventListener('click', () => togglePlay())
video.addEventListener('play', (e) => updateButton(e))
video.addEventListener('pause', (e) => updateButton(e))
toggle.addEventListener('click', () => togglePlay())
skipButtons.forEach(skipButton => skipButton.addEventListener('click', (e) => skip(e)))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
