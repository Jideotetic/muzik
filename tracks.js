document.addEventListener("DOMContentLoaded", () => {
  const trackList = document.getElementById("track-list");

  const trackImage = document.getElementById("track-image");
  const trackName = document.getElementById("track-name");
  const trackArtist = document.getElementById("track-artist");

  const playPauseBtn = document.getElementById("playpause-track");
  const nextBtn = document.getElementById("next-track");
  const prevBtn = document.getElementById("prev-track");

  const seekSlider = document.getElementById("seek_slider");
  const volumeSlider = document.getElementById("volume_slider");
  const currentTime = document.getElementById("current-time");
  const totalDuration = document.getElementById("total-duration");

  let trackIndex = 0;
  let isPlaying = false;
  let updateTimer;
  let tracks;

  const currentTrack = document.createElement("audio");

  if (localStorage.tracks) {
    tracks = JSON.parse(localStorage.getItem("tracks"));
  } else {
    fetchTracks();
  }

  loadTrack(trackIndex);
  renderTracks();

  playPauseBtn.addEventListener("click", playPauseTrack);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  volumeSlider.addEventListener("change", setVolume);
  seekSlider.addEventListener("change", seekTo);

  function createTrack(item) {
    const track = document.createElement("li");
    track.classList.add("flex", "gap-3", "items-center");

    track.innerHTML = `
     <img src=${item.album_image} class="h-10 w-10"></img>
     <span class="text-xs">${item.name}</span>
    `;

    trackList.appendChild(track);
  }

  async function fetchTracks() {
    const apiKey = process.env.API_KEY;
    const searchQuery = "music";
    const apiUrl = `https://api.jamendo.com/v3.0/tracks`;

    try {
      const response = await fetch(
        `${apiUrl}?client_id=${apiKey}&format=jsonpretty&namesearch=${searchQuery}&offset=0&limit=10`
      );
      const data = await response.json();
      tracks = data.results;
      tracks = tracks.filter((track) => {
        return track.audio !== "";
      });
      localStorage.tracks = JSON.stringify(tracks);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function renderTracks() {
    tracks.forEach((track) => {
      createTrack(track);
    });
  }

  function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = tracks[trackIndex].audio;
    currentTrack.load();

    trackImage.style.backgroundImage = `url(${tracks[trackIndex].album_image})`;
    trackName.textContent = tracks[trackIndex].name;
    trackArtist.textContent = tracks[trackIndex].artist_name;

    updateTimer = setInterval(seekUpdate, 1000);

    currentTrack.addEventListener("ended", nextTrack);
  }

  function resetValues() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
  }

  function playPauseTrack() {
    if (!isPlaying) {
      playTrack();
    } else {
      pauseTrack();
    }

    console.log(isPlaying);
  }

  function playTrack() {
    currentTrack.play();
    isPlaying = true;

    playPauseBtn.innerHTML = `<i class="fa-solid fa-circle-pause cursor-pointer"></i>`;
  }

  function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;

    playPauseBtn.innerHTML = `<i class="fa-solid fa-circle-play cursor-pointer"></i>`;
  }

  function nextTrack() {
    if (trackIndex < tracks.length - 1) {
      trackIndex += 1;
    } else {
      trackIndex = 0;
    }

    loadTrack(trackIndex);
    if (isPlaying) {
      playTrack();
    }
  }

  function prevTrack() {
    if (trackIndex > 0) {
      trackIndex -= 1;
    } else {
      trackIndex = trackIndex.length - 1;
    }

    loadTrack(trackIndex);
    if (isPlaying) {
      playTrack();
    }
  }

  function seekTo() {
    const seekto = currentTrack.duration * (seekSlider.value / 100);
    currentTrack.currentTime = seekto;
  }

  function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;

    console.log(currentTrack.volume);
  }

  function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(currentTrack.duration)) {
      seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
      seekSlider.value = seekPosition;

      let currentMinutes = Math.floor(currentTrack.currentTime / 60);
      let currentSeconds = Math.floor(
        currentTrack.currentTime - currentMinutes * 60
      );

      let durationMinutes = Math.floor(currentTrack.duration / 60);
      let durationSeconds = Math.floor(
        currentTrack.duration - durationMinutes * 60
      );

      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }

      currentTime.textContent = currentMinutes + ":" + currentSeconds;
      totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
});
