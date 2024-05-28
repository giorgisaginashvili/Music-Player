const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const backwardBtn = document.getElementById('backward');
const forwardBtn = document.getElementById('forward');
const slider = document.getElementById('slider');
const cover = document.getElementById('cover');
const songName = document.getElementById('songName');
const songAuthor = document.getElementById('songAuthor');
const currentTimeElem = document.getElementById('currentTime');
const durationElem = document.getElementById('duration');
const container = document.getElementById('container');

const songs = [
    {src: 'If We Being Real.mp3', img: 'Yeat.jpg', name: 'If We Being Real', author: 'YEAT'},
    {src: 'I Smoked Away My Brain.mp3', img: 'A$AP Rocky.jpg', name: 'I Smoked Away My Brain', author: 'A$AP Rocky'},
    {src: 'FE!N.mp3', img: 'Travis Scott.jpg', name: 'FE!N', author: 'Travis Scott'}
];

let currentSongIndex = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    cover.src = songs[index].img;
    songName.textContent = songs[index].name;
    songAuthor.textContent = songs[index].author;
    updateBackgroundColor(songs[index].img);
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
    } else {
        audio.pause();
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
}

function updateCurrentTime() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeElem.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}

function updateDuration() {
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    durationElem.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

audio.addEventListener('timeupdate', () => {
    slider.value = (audio.currentTime / audio.duration) * 100;
    updateCurrentTime();
});

audio.addEventListener('loadedmetadata', updateDuration);

slider.addEventListener('input', () => {
    audio.currentTime = (slider.value / 100) * audio.duration;
});

playPauseBtn.addEventListener('click', playPause);
forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);

// Function to calculate average color of an image
function updateBackgroundColor(imgSrc) {
    const img = new Image();
    img.src = imgSrc;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;

        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }

        r = Math.floor(r / (data.length / 4));
        g = Math.floor(g / (data.length / 4));
        b = Math.floor(b / (data.length / 4));

        container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };
}

// Initial load
loadSong(currentSongIndex);