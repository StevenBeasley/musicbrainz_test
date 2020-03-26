const Joi = require("@hapi/joi");
const getArtist = require("../../app/artist");
const artistSchema = Joi.object({
  artist: Joi.string()
    .min(2)
    .required()
    .description("artist")
    .example("Queen")
});
module.exports = [
  {
    method: "GET",
    path: "/artist/{artist}",
    handler: (request, h) => {
      return getArtist(request.params.artist);
    },
    options: {
      tags: ["api"],
      description: "responds with an artist or list of artists",
      validate: {
        params: artistSchema
        //artist: Joi.string().required()
      }
    }
  },
  {
    method: "POST",
    path: "/artist",
    handler: (request, h) => {
      return getArtist(request.payload.artist);
    },
    options: {
      tags: ["api"],
      description: "responds with an artist or list of artists",
      validate: {
        payload: artistSchema
      }
    }
  }
];
