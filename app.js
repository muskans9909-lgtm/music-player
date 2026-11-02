const songs = [
  {
    title: "Summer Vibes",
    artist: "Roa Music",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    isFavorite: false
  },
  {
    title: "Midnight Drive",
    artist: "Synthwave Beats",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    isFavorite: false
  },
  {
    title: "Lo-Fi Sunset",
    artist: "Chillhop Lounge",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    isFavorite: false
  },
  {
    title: "Acoustic Breeze",
    artist: "Bensound",
    cover: "https://images.unsplash.com/photo-1445985543469-753ec9585f2b?w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    isFavorite: false
  },
  {
    title: "Urban Groove",
    artist: "SoundHelix",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    isFavorite: false
  },
  {
    title: "Dreamy Nights",
    artist: "Atmospheric Chill",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    isFavorite: false
  },
    {
    title: "You Are My Soniya",
    artist: "Sandesh Sandilya",
    cover: "covers/cover1.jpg",
    src: "songs/song1.mp3",
    isFavorite: false
  },
  {
    title: "Dooron Dooron",
    artist: "Paresh Pahuja",
    cover: "covers/cover2.jpg",
    src: "songs/song2.mp3",
    isFavorite: false
  },
  {
    title: "Ye Tune Kya Kiya",
    artist: "Pritam, javed Bashir",
    cover: "covers/cover3.jpg",
    src: "songs/song3.mp3",
    isFavorite: false
  },
  {
    title: "Mann Mera",
    artist: "Gajendra Verma",
    cover: "covers/cover4.jpg",
    src: "songs/song4.mp3",
    isFavorite: false
  },
  {
    title: "Tum Se Hi",
    artist: "Ankit Tiwari",
    cover: "covers/cover5.jpg",
    src: "songs/song5.mp3",
    isFavorite: false
  },
];

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let isMuted = false;
let prevVolume = 0.7;

// Selectors
const audio = document.getElementById("audio-element");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");
const cover = document.getElementById("cover-art");
const coverContainer = document.querySelector(".cover-container");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const favBtn = document.getElementById("fav-btn");
const muteBtn = document.getElementById("mute-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  updateFavIcon();
  updatePlaylistHighlight();
}

function playSong() {
  isPlaying = true;
  coverContainer.classList.add("playing");
  playIcon.className = "fas fa-pause";
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  coverContainer.classList.remove("playing");
  playIcon.className = "fas fa-play";
  audio.pause();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  if (isShuffle) {
    let rand = Math.floor(Math.random() * songs.length);
    songIndex = (rand === songIndex) ? (songIndex + 1) % songs.length : rand;
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  if (!isNaN(audio.duration)) {
    audio.currentTime = (clickX / width) * audio.duration;
  }
}

// Mute Toggle
muteBtn.addEventListener("click", () => {
  if (!isMuted) {
    prevVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
    volumeIcon.className = "fas fa-volume-xmark";
    isMuted = true;
  } else {
    audio.volume = prevVolume || 0.7;
    volumeSlider.value = audio.volume;
    volumeIcon.className = "fas fa-volume-high";
    isMuted = false;
  }
});

// Shuffle & Repeat
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playSong();
  } else {
    nextSong();
  }
});

// Favorite Toggle
favBtn.addEventListener("click", () => {
  songs[songIndex].isFavorite = !songs[songIndex].isFavorite;
  updateFavIcon();
});

function updateFavIcon() {
  if (songs[songIndex].isFavorite) {
    favBtn.classList.add("active");
    favBtn.innerHTML = '<i class="fas fa-heart"></i>';
  } else {
    favBtn.classList.remove("active");
    favBtn.innerHTML = '<i class="far fa-heart"></i>';
  }
}

// Playlist UI
function renderPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, idx) => {
    const li = document.createElement("li");
    li.className = `playlist-item ${idx === songIndex ? "active" : ""}`;
    li.innerHTML = `<span>${song.title} - ${song.artist}</span><i class="fas fa-music"></i>`;
    li.addEventListener("click", () => {
      songIndex = idx;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function updatePlaylistHighlight() {
  document.querySelectorAll(".playlist-item").forEach((item, idx) => {
    item.classList.toggle("active", idx === songIndex);
  });
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
  isMuted = e.target.value == 0;
  volumeIcon.className = isMuted ? "fas fa-volume-xmark" : "fas fa-volume-high";
});

// Init
loadSong(songs[songIndex]);
renderPlaylist();