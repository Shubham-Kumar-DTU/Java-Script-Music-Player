const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const album = document.getElementById("album-art");

//song titles
const songs = ["Breaking The Habit", "Crawling", "Numb", "What I ve Done"];

//keep track of song
let songIndex = 3;

//initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  album.src = `album art/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setProgress(e) {
  const totalWidth = this.clientWidth;
  const clickWidth = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickWidth / totalWidth) * duration;
}

//Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

shuffleBtn.addEventListener("click", () => {
  const a = getRandomInt(songs.length);
  songIndex = a;
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
});

//time/song update
audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
});

//click on progressbar
progressContainer.addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
});
