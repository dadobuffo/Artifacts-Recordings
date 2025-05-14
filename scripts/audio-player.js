// Dati delle canzoni (puoi anche caricarli via fetch se sono in un file esterno)
const songs = [
  {
    id: "1",
    cover: "../assets/images/covers/Dreaded Dale - Kingslayer.jpg",
    artist: "Dreaded Dale",
    title: "Kingslayer",
    role: "engineered | mixed | mastered",
    mp3: "../assets/audio/Dreaded Dale - Kingslayer.mp3",
    duration: "3:44",
  },
  {
    id: "2",
    cover: "../assets/images/covers/Ask Me Another - Pictures.jpg",
    artist: "Ask Me Another",
    title: "Pictures",
    role: "engineered | mixed | mastered",
    mp3: "../assets/audio/Ask Me Another - Pictures.mp3",
    duration: "3:35",
  },
  {
    id: "3",
    cover: "../assets/images/covers/others/Dark Shift - Wishing Well.jpg",
    artist: "Dark Shift",
    title: "Wishing Well (remix)",
    role: "remixed",
    mp3: "../assets/audio/Dark Shift - Wishing Well.mp3",
    duration: "3:22",
  },
  {
    id: "4",
    cover: "../assets/images/covers/Dawn Won't Come - Alice In Wasteland.jpg",
    artist: "Dawn Won't Come",
    title: "Alice In Wasteland",
    role: "produced | engineered | mixed | mastered",
    mp3: "../assets/audio/Dawn Won't Come - Alice In Wasteland.mp3",
    duration: "3:17",
  },
  {
    id: "5",
    cover: "../assets/images/covers/SynrChase - MVRK KNØPFLER.jpg",
    artist: "SynrChase",
    title: "Jurassic Strat",
    role: "produced | engineered | mixed | mastered",
    mp3: "../assets/audio/SynrChase - Jurassic Strat.mp3",
    duration: "3:10",
  },
  {
    id: "6",
    cover: "../assets/images/covers/FRVGMENTS - Until The End.jpg",
    artist: "FRVGMENTS",
    title: "Until The End",
    role: "mixed | mastered",
    mp3: "../assets/audio/Frvgments - Until The End.mp3",
    duration: "3:38",
  },
];

// Variabile globale per tenere traccia della canzone attiva (indice nell'array songs)
let currentSongIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  generatePlaylist(songs);
  addPlaylistListeners(songs);
  addPlayerControls(songs);

  // Imposta la prima canzone come quella attiva
  currentSongIndex = 0;
  loadSong(currentSongIndex, false);
});

function generatePlaylist(songs) {
  const playlistContainer = document.querySelector(".playlist");
  playlistContainer.innerHTML = ""; // Svuota il container

  songs.forEach((song, index) => {
    const songButton = document.createElement("button");
    songButton.classList.add("playlist-song");
    // Collega il pulsante alla canzone usando un attributo personalizzato
    songButton.setAttribute("data-song", song.id);

    // Genera il markup interno (puoi personalizzarlo)
    songButton.innerHTML = `
      <div class="song-left-section">
        <p>${index + 1}</p>
        <p>${song.title} / ${song.artist}</p>
      </div>
      <p class="song-right-section">${song.duration || "00:00"}</p>
    `;

    playlistContainer.appendChild(songButton);

    // Aggiungi un divider se non è l'ultimo elemento
    if (index < songs.length - 1) {
      const divider = document.createElement("hr");
      divider.classList.add("song-divider");
      playlistContainer.appendChild(divider);
    }
  });
}

function addPlaylistListeners(songs) {
  // Seleziona gli elementi del player
  const coverEl = document.getElementById("cover");
  const artistEl = document.getElementById("artist");
  const titleEl = document.getElementById("title");
  const roleEl = document.getElementById("role");
  const audioEl = document.getElementById("audio");

  const playlistButtons = document.querySelectorAll(".playlist-song");

  playlistButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Imposta currentSongIndex in base all'id della canzone selezionata
      const songId = button.getAttribute("data-song");
      currentSongIndex = songs.findIndex((s) => s.id === songId);

      // Carica la canzone selezionata
      loadSong(currentSongIndex);
    });
  });
}

// Funzione che carica una canzone in base all'indice nell'array
// Aggiungiamo un parametro opzionale autoPlay (default: true)
function loadSong(index, autoPlay = true) {
  const song = songs[index];
  if (!song) {
    console.error("Canzone non trovata per l'indice:", index);
    return;
  }

  // Seleziona gli elementi del player
  const coverEl = document.getElementById("cover");
  const artistEl = document.getElementById("artist");
  const titleEl = document.getElementById("title");
  const roleEl = document.getElementById("role");
  const audioEl = document.getElementById("audio");

  coverEl.src = song.cover;
  coverEl.alt = `${song.artist} - ${song.title}`;
  artistEl.textContent = song.artist;
  titleEl.textContent = song.title;
  roleEl.textContent = song.role;

  // Aggiorna l'audio
  audioEl.src = song.mp3;

  // Avvia la riproduzione solo se autoPlay è true
  if (autoPlay) {
    audioEl.play();
  }

  // Aggiorna visivamente il pulsante attivo nella playlist
  document
    .querySelectorAll(".playlist-song.active")
    .forEach((btn) => btn.classList.remove("active"));
  const activeButton = document.querySelector(
    `.playlist-song[data-song="${song.id}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

function addPlayerControls(songs) {
  const audioEl = document.getElementById("audio");

  // PLAY/PAUSE
  const playBtn = document.getElementById("play-btn");
  const playIcon = playBtn.querySelector("img");

  playBtn.addEventListener("click", () => {
    if (audioEl.paused) {
      audioEl.play();
      playIcon.src = "assets/icons/colored/player/pause.svg";
      playIcon.alt = "Pause";
    } else {
      audioEl.pause();
      playIcon.src = "assets/icons/colored/player/play.svg";
      playIcon.alt = "Play";
    }
  });

  audioEl.addEventListener("pause", () => {
    playIcon.src = "assets/icons/colored/player/play.svg";
    playIcon.alt = "Play";
  });

  audioEl.addEventListener("play", () => {
    playIcon.src = "assets/icons/colored/player/pause.svg";
    playIcon.alt = "Pause";
  });

  // SKIP INDIETRO
  const skipBackBtn = document.getElementById("skip-back-btn");
  skipBackBtn.addEventListener("click", () => {
    if (currentSongIndex === null) return;
    currentSongIndex =
      currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    loadSong(currentSongIndex);
  });

  // SKIP AVANTI
  const skipForwardBtn = document.getElementById("skip-forward-btn");
  skipForwardBtn.addEventListener("click", () => {
    if (currentSongIndex === null) return;
    currentSongIndex =
      currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    loadSong(currentSongIndex);
  });

  // VOLUME
  const volumeBtn = document.getElementById("volume-btn");
  const volumeIcon = volumeBtn.querySelector("img");

  volumeBtn.addEventListener("click", () => {
    audioEl.muted = !audioEl.muted;
    if (audioEl.muted) {
      volumeIcon.src = "assets/icons/colored/player/volume_off.svg";
      volumeIcon.alt = "Muted";
    } else {
      volumeIcon.src = "assets/icons/colored/player/volume_up.svg";
      volumeIcon.alt = "Volume";
    }
  });

  // --- DURATA ---
  const currentDurationEl = document.getElementById("current-duration");
  const totalDurationEl = document.getElementById("total-duration");
  const seekBar = document.getElementById("seek-bar");

  // Dichiara il flag prima del suo utilizzo
  let isDragging = false;

  // Quando il file audio è caricato, imposta la durata totale e il valore massimo della seek bar
  audioEl.addEventListener("loadedmetadata", () => {
    totalDurationEl.textContent = formatTime(audioEl.duration);
    seekBar.max = audioEl.duration;
  });

  // Aggiorna la barra di avanzamento e la visualizzazione del tempo corrente mentre la canzone viene riprodotta
  audioEl.addEventListener("timeupdate", () => {
    if (!isDragging) {
      // Aggiorna la barra solo se non stai trascinando
      seekBar.value = audioEl.currentTime;
      currentDurationEl.textContent = formatTime(audioEl.currentTime);
      const percent = (audioEl.currentTime / audioEl.duration) * 100;
      seekBar.style.setProperty("--range-value", `${percent}%`);
    }
  });

  // Quando l'utente inizia a trascinare la barra
  seekBar.addEventListener("mousedown", () => {
    isDragging = true;
  });

  // Durante il trascinamento, aggiorna solo il display del tempo
  seekBar.addEventListener("input", () => {
    currentDurationEl.textContent = formatTime(seekBar.value);
    const percent = (seekBar.value / audioEl.duration) * 100;
    seekBar.style.setProperty("--range-value", `${percent}%`);
  });

  // Quando l'utente rilascia il mouse, aggiorna la posizione dell'audio
  seekBar.addEventListener("mouseup", () => {
    isDragging = false;
    audioEl.currentTime = seekBar.value;
  });
}

// Funzione per formattare il tempo in mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
