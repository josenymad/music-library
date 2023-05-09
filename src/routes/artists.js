const express = require('express');
const {
  addArtist,
  readArtists,
  readSingleArtist,
} = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(addArtist);

artistRouter.get('/', readArtists);

artistRouter.get('/:id', readSingleArtist);

module.exports = artistRouter;
