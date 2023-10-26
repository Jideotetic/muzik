document.addEventListener("DOMContentLoaded", () => {
  const artistList = document.getElementById("artist-list");
  const newArtist = document.getElementById("new-artists");

  let artists;

  newArtist.addEventListener("click", () => {
    artistList.innerHTML = "";
    fetchArtists();
  });

  if (localStorage.artists) {
    artists = JSON.parse(localStorage.getItem("artists"));
    renderArtists();
  } else {
    fetchArtists();
  }

  function createArtist(item) {
    const artist = document.createElement("li");
    artist.innerHTML = `
     <img src=${item.image} class="h-28 w-28 rounded-full"></img>
    `;

    artistList.appendChild(artist);
  }

  async function fetchArtists() {
    const apiKey = "3b217969";
    const searchQuery = "music";
    const apiUrl = `https://api.jamendo.com/v3.0/artists`;

    try {
      const response = await fetch(
        `${apiUrl}?client_id=${apiKey}&format=jsonpretty&namesearch=${searchQuery}&offset=0&limit=20`
      );
      const data = await response.json();
      artists = data.results;
      artists = artists.filter((artist) => {
        return artist.image !== "";
      });
      renderArtists();
      localStorage.artists = JSON.stringify(artists);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function renderArtists() {
    artists.forEach((artist) => {
      createArtist(artist);
    });
  }
});
