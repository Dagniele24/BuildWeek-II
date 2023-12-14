const urlSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const urlAlbum='https://striveschool-api.herokuapp.com/api/deezer/album/';
const urlArtist='https://striveschool-api.herokuapp.com/api/deezer/artist/';
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjkyNGMwNTgzNTAwMTg1MjJkMGIiLCJpYXQiOjE3MDIzNzM2NjgsImV4cCI6MTcwMzU4MzI2OH0.3UPGwlcKf8Ag5wW0fA_00qA6c7XcRvZQrqN5iPJRhSY";

let nomeArtista;
let albumsId = [725251, 75621062, 504425001, 116581812, 494082601, 42133801];
let artistsId = [412, 7892860, 459578, 54587122, 151295012, 75798, 93, 5603958, 10520799, 5603958, 6511779];
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
    rigartists.innerHTML += `<div class="card bg-dark text-white rounded-4" style="width: 18rem;">
        <img src="${artists.picture_big}" class="card-img-top" alt="card image">
        <div class="card-body">
          <h5 class="card-title">${artists.name}</h5>
          <p class="card-text">${artists.type}</p>
        </div>
      </div>`
}

//FUNZIONE PER RECUPERARE ALBUMS
const getAlbums = () => {
     albumsId.forEach((id) => {
         fetch(urlGeneratorAlbums(id), {
             headers: headers,
           })
             .then((response) => response.json())
             .then((data) => {
               albums = data;
               createAlbums(data);
             });
     })
 };

 //USA LA FUNZIONE createAlbums PER GENERARE LE CARDS
 function createAlbums(albums) {
    const rigalbum = document.querySelector("#card-section-1");
    rigalbum.innerHTML += `<div class="card mb-3 bg-dark text-white rounded-3" style="max-width: 540px;">
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
        </div>`;
}

 function urlGeneratorAlbums(id) {
    return urlAlbum + id;  
 }


window.onload = () => {
    getAlbums();
  getArtists();
};


//roba delle cards