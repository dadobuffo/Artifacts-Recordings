const songs = [
  {
    id: "1",
    cover: "assets/images/covers/Dreaded Dale - Kingslayer.jpg",
    artist: "Dreaded Dale",
    title: "Kingslayer",
    role: "engineered | mixed | mastered",
    mp3: "assets/audio/Dreaded Dale - Kingslayer.mp3",
    duration: "3:43",
  },
  {
    id: "2",
    cover: "assets/images/covers/Ask Me Another - Pictures.jpg",
    artist: "Ask Me Another",
    title: "Pictures",
    role: "engineered | mixed | mastered",
    mp3: "assets/audio/Ask Me Another - Pictures.mp3",
    duration: "3:35",
  },
  {
    id: "3",
    cover: "assets/images/covers/others/Dark Shift - Wishing Well.jpg",
    artist: "Dark Shift",
    title: "Wishing Well (remix)",
    role: "remixed",
    mp3: "assets/audio/Dark Shift - Wishing Well.mp3",
    duration: "3:22",
  },
  {
    id: "4",
    cover: "assets/images/covers/Dawn Won't Come - Alice In Wasteland.jpg",
    artist: "Dawn Won't Come",
    title: "Alice In Wasteland",
    role: "produced | engineered | mixed | mastered",
    mp3: "assets/audio/Dawn Won't Come - Alice In Wasteland.mp3",
    duration: "3:17",
  },
  {
    id: "5",
    cover: "assets/images/covers/SynrChase - MVRK KNØPFLER.jpg",
    artist: "SynrChase",
    title: "Jurassic Strat",
    role: "produced | engineered | mixed | mastered",
    mp3: "assets/audio/SynrChase - Jurassic Strat.mp3",
    duration: "3:09",
  },
  {
    id: "6",
    cover: "assets/images/covers/FRVGMENTS - Until The End.jpg",
    artist: "FRVGMENTS",
    title: "Until The End",
    role: "mixed | mastered",
    mp3: "assets/audio/Frvgments - Until The End.mp3",
    duration: "5:01",
  },
];

let currentSongIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  generatePlaylist(songs);
  addPlaylistListeners(songs);
  addPlayerControls(songs);

  currentSongIndex = 0;
  loadSong(currentSongIndex, false);
});

function generatePlaylist(songs) {
  const playlistContainer = document.querySelector(".playlist");
  playlistContainer.innerHTML = "";

  songs.forEach((song, index) => {
    const songButton = document.createElement("button");
    songButton.classList.add("playlist-song");
    songButton.setAttribute("data-song", song.id);

    songButton.innerHTML = `
      <div class="song-left-section">
        <p>${index + 1}</p>
        <p>${song.title} / ${song.artist}</p>
      </div>
      <p class="song-right-section">${song.duration || "00:00"}</p>
    `;

    playlistContainer.appendChild(songButton);

    if (index < songs.length - 1) {
      const divider = document.createElement("hr");
      divider.classList.add("song-divider");
      playlistContainer.appendChild(divider);
    }
  });
}

function addPlaylistListeners(songs) {
  const coverEl = document.getElementById("cover");
  const artistEl = document.getElementById("artist");
  const titleEl = document.getElementById("title");
  const roleEl = document.getElementById("role");
  const audioEl = document.getElementById("audio");

  const playlistButtons = document.querySelectorAll(".playlist-song");

  playlistButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const songId = button.getAttribute("data-song");
      currentSongIndex = songs.findIndex((s) => s.id === songId);

      loadSong(currentSongIndex);
    });
  });
}

function loadSong(index, autoPlay = true) {
  const song = songs[index];
  if (!song) {
    console.error("Canzone non trovata per l'indice:", index);
    return;
  }

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

  audioEl.src = song.mp3;

  if (autoPlay) {
    audioEl.play();
  }

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

let audioCtx, track, gainNode;

function addPlayerControls(songs) {
  const audioEl = document.getElementById("audio");

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  track = audioCtx.createMediaElementSource(audioEl);

  gainNode = audioCtx.createGain();

  track.connect(gainNode).connect(audioCtx.destination);

  const desiredDb = -6;
  gainNode.gain.value = Math.pow(10, desiredDb / 20);

  const resumeCtx = () => {
    if (audioCtx.state === "suspended") audioCtx.resume();
    document.removeEventListener("click", resumeCtx);
  };

  document.addEventListener("click", resumeCtx);

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

  const skipBackBtn = document.getElementById("skip-back-btn");
  skipBackBtn.addEventListener("click", () => {
    if (currentSongIndex === null) return;
    currentSongIndex =
      currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    loadSong(currentSongIndex);
  });

  const skipForwardBtn = document.getElementById("skip-forward-btn");
  skipForwardBtn.addEventListener("click", () => {
    if (currentSongIndex === null) return;
    currentSongIndex =
      currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    loadSong(currentSongIndex);
  });

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

  const currentDurationEl = document.getElementById("current-duration");
  const totalDurationEl = document.getElementById("total-duration");
  const seekBar = document.getElementById("seek-bar");

  let isDragging = false;

  audioEl.addEventListener("loadedmetadata", () => {
    totalDurationEl.textContent = formatTime(audioEl.duration);
    seekBar.max = audioEl.duration;
  });

  audioEl.addEventListener("timeupdate", () => {
    if (!isDragging) {
      seekBar.value = audioEl.currentTime;
      currentDurationEl.textContent = formatTime(audioEl.currentTime);
      const percent = (audioEl.currentTime / audioEl.duration) * 100;
      seekBar.style.setProperty("--range-value", `${percent}%`);
    }
  });

  seekBar.addEventListener("mousedown", () => {
    isDragging = true;
  });

  seekBar.addEventListener("input", () => {
    currentDurationEl.textContent = formatTime(seekBar.value);
    const percent = (seekBar.value / audioEl.duration) * 100;
    seekBar.style.setProperty("--range-value", `${percent}%`);
  });

  seekBar.addEventListener("mouseup", () => {
    isDragging = false;
    audioEl.currentTime = seekBar.value;
  });
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
