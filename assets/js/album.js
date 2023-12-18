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
      
      createAlbumSection(data);
    });
};

function createAlbumSection(data) {
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
