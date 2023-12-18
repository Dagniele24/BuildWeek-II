// const urlSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
// const urlAlbum='https://striveschool-api.herokuapp.com/api/deezer/album/';
// const urlArtist='https://striveschool-api.herokuapp.com/api/deezer/artist/';
// const token =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjkyNGMwNTgzNTAwMTg1MjJkMGIiLCJpYXQiOjE3MDIzNzM2NjgsImV4cCI6MTcwMzU4MzI2OH0.3UPGwlcKf8Ag5wW0fA_00qA6c7XcRvZQrqN5iPJRhSY";

// let nomeArtista;
// let albumsId = [725251, 75621062, 504425001, 116581812, 494082601, 42133801];
// let artistsId = [412, 7892860, 459578, 54587122, 151295012, 75798, 93, 5603958, 10520799, 5603958, 6511779, 412];
// let albums = []
// let artists = []

// const headers = {
//   Authorization: token,
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// function urlGeneratorArtists(id) {
//     return urlArtist + id;
//  }

//  //FUNZIONE PER RECUPERARE ARTISTI
//  const getArtists = () => {
//      artistsId.forEach((id) => {
//          fetch(urlGeneratorArtists(id), {
//              headers: headers,
//            })
//              .then((response) => response.json())
//              .then((data) => {
//                artists = data;
//                createArtists(data);

//              });
//      })
//  };

function urlGeneratorAlbum(id) {
  return urlAlbum + id;
}

const getRecord = (id) => {
  fetch(urlGeneratorAlbum(id), {
    headers: {
      authorization: token,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      albums.push(data);
      console.log(data);
      createAlbumSection(data);
    });
};

function createAlbumSection(data) {
  // function handelDetailsData(data) {
  //     document.getElementById('name').innerText = "detagli prodotti" + data.name;
  //     document.getElementById('description').innerText = data.description;
  //     document.getElementById('price').innerText = data.price;
  //     document.getElementById('id').innerText = data._id;
  //     document.getElementById('img').src = data.imageUrl;
  // }

  console.log(albums);
  const containerTrack = document.querySelector("#container-track2");
  containerTrack.innerHTML = `

    // ///
    <div class="card mb-3 mt-5 border-0 bg-transparent text-white container" style="max-width: 1000px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.cover_medium}" class="img-fluid rounded-start" alt="${data.title}">
    </div>
    <div class="col-md-8">
     <div class="row">
      <div class="card-body  mt-5">
        <h1 class="card-title">${data.title}</h1>
        <h4 id="artist-name">${data.artist.name}</h4>
        <div class="container   mt-5 align-items-center "><div class=" row d-flex align-items-center"><img class="rounded-circle col-1" src="${data.artist.picture} ">
        <p class="col-11  mt-3">
        <span class="">-${data.artist.name}</span>
        <span class="">-${data.release_date}</span>
        <span class="">-${data.nb_tracks}</span>
        <span class="">-${data.duration}</span>
        </p>
        </div>
        </div>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>


     <div/>
    </div>
  </div>
</div>

    `;
}

window.onload = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  getRecord(id);
};
