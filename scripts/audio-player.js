// Riferimenti agli elementi HTML
const coverImage = document.getElementById("cover"); // Immagine copertura
const playBtn = document.getElementById("play-btn"); // Pulsante play/stop
const currentDurationElem = document.getElementById("current-duration"); // Durata corrente
const totalDurationElem = document.getElementById("total-duration"); // Durata totale
const volumeBtn = document.getElementById("volume-btn"); // Pulsante volume
const seekBar = document.getElementById("seek-bar"); // Seek bar
const playlist = document.getElementById("playlist"); // Playlist

const audio = new Audio(); // Oggetto audio (inizialmente senza file)

let isPlaying = false; // Stato di riproduzione
let currentTrackIndex = 0; // Indice della traccia corrente

// Funzione per formattare i secondi in formato "minuti:secondi"
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Funzione per aggiornare il player con una nuova traccia
function loadTrack(track) {
  audio.src = track.dataset.src;
  coverImage.src = track.dataset.cover;
  document.getElementById("title").textContent = track.dataset.title;
  document.getElementById("artist").textContent = track.dataset.artist;
  totalDurationElem.textContent = formatTime(audio.duration);
  seekBar.value = 0; // Reset della seek bar
  currentDurationElem.textContent = "0:00"; // Reset della durata corrente
}

// Funzione per riprodurre o mettere in pausa la traccia
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = `<img src="assets/icons/audio player/play.svg" alt="Play">`;
  } else {
    audio.play();
    playBtn.innerHTML = `<img src="assets/icons/audio player/pause.svg" alt="Pause">`;
  }
  isPlaying = !isPlaying;
}

// Gestione del clic sul pulsante Play/Stop
playBtn.addEventListener("click", togglePlayPause);

// Gestione della durata totale dell'audio (impostiamo il valore al caricamento)
audio.addEventListener("loadeddata", () => {
  totalDurationElem.textContent = formatTime(audio.duration); // Impostiamo la durata totale
});

// Aggiorniamo la durata corrente e la posizione della seek bar in tempo reale
audio.addEventListener("timeupdate", () => {
  currentDurationElem.textContent = formatTime(audio.currentTime); // Durata corrente
  const progress = (audio.currentTime / audio.duration) * 100; // Calcoliamo la percentuale di avanzamento
  seekBar.value = progress; // Aggiorniamo il valore della seek bar per visualizzare il progresso
});

// Funzione per gestire il clic sulla seek bar e far avanzare l'audio
seekBar.addEventListener("click", (e) => {
  const seekBarRect = seekBar.getBoundingClientRect(); // Otteniamo la posizione e la larghezza della seek bar
  const offsetX = e.clientX - seekBarRect.left; // Calcoliamo la distanza tra il clic e il lato sinistro della seek bar
  const seekBarWidth = seekBarRect.width; // Larghezza della seek bar
  const newTime = (offsetX / seekBarWidth) * audio.duration; // Calcoliamo il nuovo tempo in base alla posizione del clic
  audio.currentTime = newTime; // Aggiorniamo l'audio alla nuova posizione
});

// Gestione del cambio traccia tramite la playlist
playlist.addEventListener("click", (e) => {
  if (e.target && e.target.matches("li.track")) {
    currentTrackIndex = Array.from(playlist.children).indexOf(e.target); // Otteniamo l'indice della traccia cliccata
    loadTrack(e.target);
    togglePlayPause(); // Iniziamo la riproduzione della traccia
  }
});

// Funzione per saltare alla traccia successiva
function skipForward() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.children.length;
  loadTrack(playlist.children[currentTrackIndex]);
  togglePlayPause();
}

// Funzione per tornare alla traccia precedente
function skipBack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.children.length) %
    playlist.children.length;
  loadTrack(playlist.children[currentTrackIndex]);
  togglePlayPause();
}

// Gestione dei pulsanti di skip
document
  .getElementById("skip-forward-btn")
  .addEventListener("click", skipForward);
document.getElementById("skip-back-btn").addEventListener("click", skipBack);

// Gestione del volume
let isVolumeMuted = false;
let previousVolume = 1;

// Funzione per mutare o ripristinare il volume
volumeBtn.addEventListener("click", () => {
  if (isVolumeMuted) {
    audio.volume = previousVolume;
    isVolumeMuted = false;
    volumeBtn.innerHTML = `<img src="assets/icons/audio player/volume.svg" alt="Volume">`; // Volume attivo
  } else {
    previousVolume = audio.volume;
    audio.volume = 0;
    isVolumeMuted = true;
    volumeBtn.innerHTML = `<img src="assets/icons/audio player/mute.svg" alt="Mute">`; // Mute
  }
});
