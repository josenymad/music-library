const express = require('express');
const {
  addArtist,
  readArtists,
  readSingleArtist,
  replaceArtist,
  updateArtist,
  deleteArtist,
} = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(addArtist).get(readArtists);

artistRouter
  .route('/:id')
  .get(readSingleArtist)
  .put(replaceArtist)
  .patch(updateArtist)
  .delete(deleteArtist);

module.exports = artistRouter;
