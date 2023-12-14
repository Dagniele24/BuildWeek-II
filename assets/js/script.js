const urlSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const urlAlbum='https://striveschool-api.herokuapp.com/api/deezer/album/';
const urlArtist='https://striveschool-api.herokuapp.com/api/deezer/artist/';
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjkyNGMwNTgzNTAwMTg1MjJkMGIiLCJpYXQiOjE3MDIzNzM2NjgsImV4cCI6MTcwMzU4MzI2OH0.3UPGwlcKf8Ag5wW0fA_00qA6c7XcRvZQrqN5iPJRhSY";

let nomeArtista;
let albumsId = [725251, 75621062, 504425001, 116581812, 494082601, 42133801];
let artistsId = [412, 7892860, 459578, 54587122, 151295012, 75798, 93, 5603958, 10520799, 5603958, 6511779, 412];
let albums = []
let artists = []

const headers = {
  Authorization: token,
  Accept: "application/json",
  "Content-Type": "application/json",
};
function urlGeneratorArtists(id) {
   return urlArtist + id;    
}

//FUNZIONE PER RECUPERARE ARTISTI
const getArtists = () => {
    artistsId.forEach((id) => {
        fetch(urlGeneratorArtists(id), {
            headers: headers,
          })
            .then((response) => response.json())
            .then((data) => {
              artists = data;
              createArtists(data);
              
            });
    }) 
};
function createArtists(artists) {
    const rigartists = document.querySelector("#card-section-2");
    rigartists.innerHTML += `<a href="#" class="card bg-dark text-white rounded-4" style="width: 18rem;">
        <img src="${artists.picture_big}" class="card-img-top" alt="card image">
        <div class="card-body">
          <h5 class="card-title">${artists.name}</h5>
          <p class="card-text">${artists.type}</p>
        </div>
      </a>`;
}

//FUNZIONE PER RECUPERARE ALBUMS
const getAlbums = () => {
     albumsId.forEach((id) => {
         fetch(urlGeneratorAlbums(id), {
             headers: headers,
           })
             .then((response) => response.json())
             .then((data) => {
                albums.push(data);
                console.log(albums);
                createAlbums(data);
                createTrackSection();
             });
     })
 };

 //USA LA FUNZIONE createAlbums PER GENERARE LE CARDS
 function createAlbums(albums) {
    const rigalbum = document.querySelector("#card-section-1");
    rigalbum.innerHTML += `<a href="#" class="card mb-3 bg-dark text-white rounded-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${albums.cover_big}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${albums.title}</h5>
                </div>
              </div>
            </div>
 
          </div>
        </a>`;
}

//create track generator
function createTrackSection() {
  const randomAlbumIndex = Math.floor(Math.random() * albums.length);
  const randomAlbum = albums[randomAlbumIndex];
  const containerTrack = document.getElementById('container-track');
  containerTrack.innerHTML = `<img class="w-25 me-4" src="${randomAlbum.cover_medium}" alt="${randomAlbum.title}" />
  <div class="track-infos text-white">
      <div class="row-alignment d-flex flex-row justify-content-between">
          <h6>ALBUM</h6>
          <div class="hide-ads px-3 py-1 rounded-5">
              NASCONDI ANNUNCI
          </div>
      </div>
      <h1 id="song-title" class="display-1">${randomAlbum.tracks.data[0].title}</h1>
      <h6 id="artist-name">${randomAlbum.artist.name}</h6>
      <p>
      Sta canzone è bella fidati
      </p>
      <div class="row-alignment button-section">
          <button class="btn btn-success me-2 py-3 rounded-5 px-5" type="button">
              Play
          </button>
          <button class="btn btn-outline-light me-2 py-3 rounded-5 px-5" type="button">
              Salva
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
              class="bi bi-three-dots" viewBox="0 0 16 16">
              <path
                  d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
      </div>
  </div> `;
}

 function urlGeneratorAlbums(id) {
    return urlAlbum + id;  
 }




window.onload = () => {
    getAlbums();
  getArtists();
};

