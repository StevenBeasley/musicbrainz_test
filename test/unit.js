const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const lab = (exports.lab = Lab.script());

const axios = require("axios");
const sinon = require("sinon");

const artist = require("../app/artist");

const queenReleases = require("./testData/queenReleases");
const queenArtists = require("./testData/queenArtists");

lab.experiment("Valid Artist tests", () => {
  lab.before(async () => {
    axios.get = sinon.stub();
    let resolveQueenArtist = { data: { artists: queenArtists } };
    axios.get
      .withArgs("http://musicbrainz.org/ws/2/artist?query=queen")
      .returns(Promise.resolve(resolveQueenArtist));

    //we do not want to use a reference here as will cause issues with other tests
    let modifiedQueenArtists = JSON.parse(JSON.stringify(queenArtists));
    //update the score so we get 2 returns
    modifiedQueenArtists[1].score = 81;
    let resolveModifiedQueenArtist = {
      data: { artists: modifiedQueenArtists }
    };
    axios.get
      .withArgs("http://musicbrainz.org/ws/2/artist?query=Queen")
      .returns(Promise.resolve(resolveModifiedQueenArtist));

    let resolveQueenReleases = { data: { releases: queenReleases } };
    axios.get
      .withArgs(
        "http://musicbrainz.org/ws/2/release?artist=0383dadf-2a4e-4d10-a46a-e9e041da8eb3"
      )
      .returns(Promise.resolve(resolveQueenReleases));
  });
  lab.test("Valid artist return an array of releases", async () => {
    let data = await artist("queen");
    Code.expect(data).to.be.an.array();
    Code.expect(data).to.equal(queenReleases);
  });
  lab.test(
    "Valid artist returns multiple artists when score over 80",
    async () => {
      let data = await artist("Queen");
      Code.expect(data).to.be.an.array();
      Code.expect(data).to.have.length(2);
    }
  );
});
