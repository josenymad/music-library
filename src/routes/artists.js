const express = require('express');
const {
  addArtist,
  readArtists,
  readSingleArtist,
  replaceArtist,
  updateArtist,
  deleteArtist,
  addAlbum,
} = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(addArtist).get(readArtists);

artistRouter
  .route('/:id')
  .get(readSingleArtist)
  .put(replaceArtist)
  .patch(updateArtist)
  .delete(deleteArtist);

artistRouter.route('/:id/albums').post(addAlbum);

module.exports = artistRouter;
