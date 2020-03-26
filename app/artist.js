const axios = require("axios");

const baseURL = "http://musicbrainz.org/ws/2/";
const artistQueryURL = `${baseURL}artist?query=`;
const releaseQueryURL = `${baseURL}release?artist=`;

const validTypes = ["Person", "Group"];

async function getArtist(artistName) {
  //get all artists
  let artistList = await requestArtist(artistName);
  //filter any we do not want
  artistList = artistList.filter(filterArtist(artistName));
  //if we just have 1 artist remaining then return the releases
  if (artistList.length === 1) {
    return await requestReleases(artistList[0].id);
  } else {
    //if not, return the arists
    return artistList;
  }
}
async function requestArtist(artistName) {
  let data = await axios.get(artistQueryURL + artistName);
  return data.data.artists;
}
async function requestReleases(artistId) {
  let releaseList = await axios.get(releaseQueryURL + artistId);
  return releaseList.data.releases;
}
function filterArtist(artistName) {
  return function filter(artist) {
    //get the exact name
    if (artist.name.toLowerCase() !== artistName.toLowerCase()) {
      return false;
    }
    //make sure its a type we want
    if (!artist.hasOwnProperty("type") && !validTypes.includes(artist.type)) {
      return false;
    }
    //filter the garbage responses
    if (artist.score < 80) {
      return false;
    }

    return true;
  };
}
module.exports = getArtist;
