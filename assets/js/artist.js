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
      });
  };

  function createBanner(data) {
    console.log(data);
    const containerTrack = document.querySelector('#container-track2');
    containerTrack.innerHTML = `
    <div class=" mx-0" style="background-image: url(${data.picture_xl}); background-size: cover ; background-position: 50% 40%; " >
    <div >
    <div
                        class=" p-2 pb-5 row-container track-management mb-2 d-flex flex-row justify-content-between align-items-center">
                        <div class="track-control-icons mx-3">
                            <a href="index.html">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-caret-left" viewBox="0 0 16 16">
                                    <path
                                        d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                                </svg></a>
                            <a href="#" class="mx-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray"
                                    class="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path
                                        d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                </svg></a>
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
    <h1 class="text-white display-2"> <b> ${data.name} </b> </h1>
    <h5 class="text-white py-4 shadow-lg">${data.nb_fan} ascoltatori mensili</h5>
 </div>
</div>

    `;
  }

  window.onload = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    getArtist(id);
  };