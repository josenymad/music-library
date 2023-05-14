const express = require('express');
const { readAlbums, readSingleAlbum } = require('../controllers/albums');

const albumRouter = express.Router();

albumRouter.route('/').get(readAlbums);

albumRouter.route('/:id').get(readSingleAlbum);

module.exports = albumRouter;
