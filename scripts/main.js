//Please note, if copying make sure to insert your own API-key after "api_key=", you may get one at https://api.nasa.gov/#apply-for-an-api-key

const nasa = (function () {
  let nasa = null;
  $.ajax({
    async: false,
    global: false,
    url: "https://api.nasa.gov/planetary/apod?api_key=WJvasr9SXaUJcquJxFlEL0zwNx7RJ5owbBePUsPD",
    dataType: "json",
    success: function (data) {
      nasa = data;
    }
  });
  return nasa;
})();

const setTitle = function () {
  document.getElementById('spaceTitle').innerHTML = nasa.title;
}

//REFACTOR 
const setMedia = function () {

  const type = nasa.media_type;

  if (type === 'image') {

    //Check for HD first
    if (nasa.hdurl !== null) {
      document.getElementById('mediaContentTwo').src = nasa.hdurl;
      console.log('HD worked');
    }

    //No HD, so load non-hd
    if (nasa.hdurl === null && nasa.url !== null) {
      document.getElementById('mediaContentTwo').src = nasa.url;
    }

    //In case of 404 or image error
    if (nasa.hdurl === null && nasa.url === null) {
      document.getElementById('mediaContent').innerHTML = 'Oh no! There was an error loading the image! Please check back later!';
    }
  }

  //Check for type video and set src to video url
  if (type === 'video') {
 document.getElementById('mediaContent').append('<iframe id="mediaContentVideo"></iframe>').src = nasa.url;
  }
}

const setExplanation = function () {
  document.getElementById('spaceBody').innerHTML = nasa.explanation;
}

const setDate = function () {
  document.getElementById('spaceDate').innerHTML = '<p class="infoLabel">Date </p>' + nasa.date;
}

const setCopyright = function () {
  //Copyright can be empty if no attribution is necessary
  if (nasa.spaceCopyright !== undefined && nasa.spaceCopyright !== null) {
    document.getElementById('spaceCopyright').innerHTML = '<p class="infoLabel">Copyright </p>' + nasa.copyright;
  }

  if (nasa.spaceCopyright === null || nasa.spaceCopyright === undefined) {
    document.getElementById('spaceCopyright').innerHTML = '<p class="infoLabel">Copyright </p><p>None</p>';
  }
}

const runAll = function () {
  setTitle();
  setMedia();
  setExplanation();
  setDate();
  setCopyright();
}

runAll();
