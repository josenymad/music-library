const express = require('express');
const {
  addArtist,
  readArtists,
  readSingleArtist,
  updateArtist,
} = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(addArtist);

artistRouter.get('/', readArtists);

artistRouter.get('/:id', readSingleArtist);

artistRouter.put('/:id', updateArtist);

module.exports = artistRouter;
