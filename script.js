const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.getElementById('currTime');
const durTime = document.getElementById('durTime');

const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    audio.pause();
}

function changeSong(direction) {
    songIndex = (songIndex + direction + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    progress.style.width = `${(currentTime / duration) * 100}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    audio.currentTime = (e.offsetX / width) * audio.duration;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

function updateTimes(e) {
    const { duration, currentTime } = e.srcElement;
    currTime.innerText = formatTime(currentTime);
    durTime.innerText = isNaN(duration) ? '00:00' : formatTime(duration);
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => changeSong(-1));
nextBtn.addEventListener('click', () => changeSong(1));

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', () => changeSong(1));
audio.addEventListener('timeupdate', updateTimes);
