const urlSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const urlAlbum='https://striveschool-api.herokuapp.com/api/deezer/album/';
const urlArtist='https://striveschool-api.herokuapp.com/api/deezer/artist/';
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjkyNGMwNTgzNTAwMTg1MjJkMGIiLCJpYXQiOjE3MDIzNzM2NjgsImV4cCI6MTcwMzU4MzI2OH0.3UPGwlcKf8Ag5wW0fA_00qA6c7XcRvZQrqN5iPJRhSY";

let nomeArtista;
let albumsId = [725251, 75621062, 504425001, 116581812, 494082601, 42133801, 226772462, 12507730];
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
  console.log(artists);
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
   console.log(albums);
 }

 function urlGeneratorAlbums(id) {
    return urlAlbum + id;  
 }


window.onload = () => {
  getArtists();
  getAlbums();
};
