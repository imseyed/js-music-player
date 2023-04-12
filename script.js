const audio = new Audio('song.mp3');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress');
const progressBarElapsed = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');

playBtn.addEventListener('click', togglePlay);
progressBar.addEventListener('mousedown', seek);
document.addEventListener('keydown', handleKeydown);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', handleEnded);
audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBarElapsed.style.width = `${progressPercent}%`;
    currentTime.textContent = formatTime(audio.currentTime);
}

function seek(event) {
    audio.currentTime = (event.offsetX / progressBar.offsetWidth) * audio.duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function handleKeydown(event) {
    if (event.code === 'ArrowRight') {
        audio.currentTime += 5;
    } else if (event.code === 'ArrowLeft') {
        audio.currentTime -= 5;
    } else if (event.code === 'Escape' || event.code === 'Space') {
        togglePlay();
    }
}

function handleEnded() {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    togglePlay();
}
document.getElementsByTagName('body')[0].style.backgroundImage = document.getElementById('album-art').style.backgroundImage;