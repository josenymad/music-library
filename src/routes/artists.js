const express = require('express');
const {
  addArtist,
  readArtists,
  readSingleArtist,
  replaceArtist,
  updateArtist
} = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(addArtist).get(readArtists);

artistRouter.route('/:id').get(readSingleArtist).put(replaceArtist).patch(updateArtist);

module.exports = artistRouter;
