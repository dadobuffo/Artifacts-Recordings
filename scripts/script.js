const tracks = [
  {
    title: "Kingslayer",
    artist: "Dreaded Dale",
    details: "Produced | Engineered | Mixed | Mastered",
    src: "audio/kingslayer.wav",
    cover: "images/covers/Dreaded Dale - Kingslayer.jpg",
  },
  {
    title: "Pictures",
    artist: "Ask Me Another",
    src: "audio/pictures.mp3",
  },
  {
    title: "Wishing Well (Remix)",
    artist: "Dark Shift",
    src: "audio/wishing_well.mp3",
  },
  {
    title: "Alice In Wasteland",
    artist: "Dawn Won't Come",
    src: "audio/alice_wasteland.mp3",
  },
  {
    title: "Jurassic Strat",
    artist: "SynrChase",
    src: "audio/jurassic_strat.mp3",
  },
  {
    title: "Until The End",
    artist: "FRVGMENTS",
    src: "audio/until_the_end.mp3",
  },
];

const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");
const playlistEl = document.getElementById("playlist");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const detailsEl = document.getElementById("details");
const coverEl = document.getElementById("cover");

let currentTrackIndex = 0;

// Funzione per cambiare traccia
function changeTrack(index) {
  currentTrackIndex = index;
  const track = tracks[index];

  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  detailsEl.textContent = track.details || "";
  coverEl.src = track.cover || "images/default.jpg";
  audioPlayer.src = track.src;

  audioPlayer.play();
  playBtn.textContent = "⏸";
}

// Popoliamo la playlist
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.textContent = `${track.title} / ${track.artist}`;
  li.addEventListener("click", () => changeTrack(index));
  playlistEl.appendChild(li);
});

// Play/Pausa
playBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸";
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  }
});

// Gestione volume
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value;
});

const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

// Aggiorna il tempo totale quando il file è caricato
audioPlayer.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audioPlayer.duration);
  seekBar.max = audioPlayer.duration;
});

// Aggiorna la barra durante la riproduzione
audioPlayer.addEventListener("timeupdate", () => {
  seekBar.value = audioPlayer.currentTime;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

// Permette di cambiare la posizione della traccia trascinando la barra
seekBar.addEventListener("input", () => {
  audioPlayer.currentTime = seekBar.value;
});

// Funzione per formattare il tempo in minuti:secondi
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
