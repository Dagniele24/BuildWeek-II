let numberList = 5;

  function urlGeneratorArtist(id) {
    return urlArtist + id;
  }
  
  const getRecord = (id) => {
    fetch(urlGeneratorArtist(id) + `/top?limit=${numberList}`, {
      headers: {
        authorization: token,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        artists.push(data.data);
        // tracks.push(data.tracks);
        createArtistSection(data.data);
      });
  };
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
    <th scope="row" class="bg-transparent">${index + 1}</th>
    <td >
        <a href="#"><img src="${track.album.cover_small}" alt="cover album"></a>
        <p class="mb-0"><a href="#">${track.title}</a></p>
   
    </td>

    <td>${track.rank}</td>
  
    <td >${convertTimeAlbums(track.duration)}</td>
   
  </tr>

  `;
  });
  tBody.innerHTML = tableHTML;
  }

  
  function extendList () {
    numberList += 5
  }


  window.onload = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    getRecord(id);
  };
  