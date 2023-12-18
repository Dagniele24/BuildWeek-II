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
     // tracks.push(data.tracks);

      createAlbumSection(data);
      console.log(data.tracks.data);
      createTable(data.tracks.data)
      //createTable(data.tracks)
      
    });
};


function createAlbumSection(data) {
  //RECUPERO ANNO ALBUM
  let date = data.release_date;
  let year = date.split('-')[0];
   /* let year = date.slice(0, 4); */
  
  // RECUPERO DURATA ALBUM
    let songDuration = data.duration; 
    min = Math.floor(songDuration/60);
    sec = Math.floor(songDuration % 60);
  
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
        <span class="">${data.artist.name}</span>
        <span class="">- ${year}</span>
        <span class="">-${data.nb_tracks} brani,</span>
        <span class="text-secondary">${min +  ' min. ' + sec +  ' sec.'}</span>
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

//FUNZIONE POPOLA LISTA PAGINA ALBUM



function createTable(tracks) {
  const tBody = document.querySelector("#bodyTable");
  let tableHTML = ""
  tracks.forEach((track, index) => {
    tableHTML +=
    `
  <tr>
    <th scope="row" class="bg-transparent">${index + 1}</th>
    <td rowspan="2">
        <p class="mb-0">${track.title}</p>
        <p>${track.artist.name}</p>
    </td>
  </tr>
  <tr>
    <th scope="row" class="bg-transparent">2</th>
    <td>${track.rank}</td>
  </tr>
  <tr>
    <th scope="row" class="bg-transparent">3</th>
    <td colspan="2">${track.duration}</td>
    <td></td>
  </tr>

  `;

  })
  tBody.innerHTML = tableHTML
}


  window.onload = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    getRecord(id);
  };