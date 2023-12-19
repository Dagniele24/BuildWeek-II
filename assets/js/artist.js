let numberList = 5;
const showMore = document.getElementById('showMore');
function urlGeneratorTracks(id, limit) {
  return urlArtist + id + `/top?limit=${limit}`;
}
function getRecord(id) {
  fetch(urlGeneratorTracks(id, numberList), {
    headers: {
      authorization: token,
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      artists.push(data.data);
      createArtistSection(data.data);
      //console.log(artists);
    })
    .catch((error) => console.error('Errore nel recupero dei dati:', error));
}
function urlGeneratorArtist(id) {
  return urlArtist + id;
}

const getArtist = (id) => {
  fetch(urlGeneratorArtist(id), {
    headers: {
      authorization: token,
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      artists.push(data);
      // tracks.push(data.tracks);
      createBanner(data);
      createLikedTracks(data);
    });
};
function createBanner(data) {
  console.log(data);
  const containerTrack = document.querySelector('#container-track2');
  containerTrack.innerHTML = `
    <div class=" mx-0" style="background-image: url(${data.picture_xl}); background-size: cover ; background-position: 50% 40%; " >
    <div >
    <div
                        class=" p-2 pb-5 ps-5 pt-3 row-container track-management mb-2 d-flex flex-row justify-content-between align-items-center">
                        <div class="track-control-icons mx-3">
                        <a href="index.html">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-caret-left border border-black border-3 bg-white rounded-circle"><path d="M12,0A12,12,0,1,0,24,12,12.01,12.01,0,0,0,12,0Zm2.64,16.232a1,1,0,1,1-1.28,1.536l-6-5a1,1,0,0,1,0-1.536l6-5a1,1,0,1,1,1.28,1.536L9.562,12Z"/></svg>
                            </a>
                        <a href="#" class="mx-3">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi bi-caret-right border border-black border-3 bg-dark rounded-circle"><path d="M12,0A12,12,0,1,0,24,12,12.01,12.01,0,0,0,12,0Zm4.641,12.768-6,5a1,1,0,1,1-1.282-1.536L14.437,12,9.359,7.768a1,1,0,1,1,1.282-1.536l6,5a1,1,0,0,1,0,1.536Z"/></svg></a>
                    </div>
                        <div
                            class="profile bg-black d-flex flex-row align-items-center rounded-5 text-white justify-content-between pe-2 py-1">
                            <div class="left d-flex flex-row align-items-center">
                                <img class="me-2" src="assets/imgs/profile-icon.jpg" alt="Foto profilo" />
                                <h6 class="mb-0">Marco Rossi</h6>
                            </div>
                            <div class="right">
                                <i class="bi bi-caret-down-fill"></i>
                            </div>
                        </div>
                    </div>
  </div>
  <div class="ms-3" style="padding-top:150px;">
  <h5 class="pt-5 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill=" skyblue" class="bi bi-patch-check-fill text-white" viewBox="0 0 16 16">
  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
</svg>   artista verificato</h5>
    <h1 class="text-white display-2" #testox > <b> ${data.name} </b> </h1>
    <h5 class="text-white py-4" #testox>${data.nb_fan} ascoltatori mensili</h5>
 </div>
</div>

    `;
}

function convertTimeAlbums(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function createArtistSection(tracks) {
  const tBody = document.querySelector('#tabArtist');
  let tableHTML = '';
  tracks.forEach((track, index) => {
    tableHTML += `
  <tr>
  
    <th scope="row" class="bg-transparent"><div class="d-flex align-items-center"> ${
      index + 1
    }</div></th>
    <td>
    <div class="d-flex flex-row align-items-center">
        <a href="album.html?id=${track.album.id}"><img class="w-50" src="${
      track.album.cover_small
    }" alt="cover album"></a>
        <p class="mb-0"><a href="#">${track.title}</a></p>
        </div>
    </td>
    
    <td ><div class="d-flex align-items-center"> ${track.rank}</div></td>
  
    <td <div class="d-flex align-items-center">${convertTimeAlbums(
      track.duration
    )}</div></td>
   
  </tr>

  `;
  });
  tBody.innerHTML = tableHTML;
}

function createLikedTracks(artist) {
  const likedTracksSection = document.getElementById('liked-tracks');

  likedTracksSection.innerHTML = `<img src="${artist.picture}" alt="${artist.name} picture" class="w-25 rounded-circle" />
  <div class="d-flex flex-column">
    <p>Hai messo mi piace a 11 brani</p>
    <p>Di ${artist.name}</p>
    </div>`;
}

window.onload = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  getRecord(id);
  getArtist(id);
  showMore.onclick = () => {
    numberList += 5;
    getRecord(id);
  };
};
