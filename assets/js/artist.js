
  function urlGeneratorArtist(id) {
    return urlArtist + id;
  }
  
  const getRecord = (id) => {
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
        createArtistSection(data);
      });
  };

  function createArtistSection(data) {
    console.log(data);
  }

  window.onload = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    getRecord(id);
  };
  