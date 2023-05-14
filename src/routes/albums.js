const express = require('express');
const {
  readAlbums,
  readSingleAlbum,
  replaceAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/albums');

const albumRouter = express.Router();

albumRouter.route('/').get(readAlbums);

albumRouter
  .route('/:id')
  .get(readSingleAlbum)
  .put(replaceAlbum)
  .patch(updateAlbum)
  .delete(deleteAlbum);

module.exports = albumRouter;
