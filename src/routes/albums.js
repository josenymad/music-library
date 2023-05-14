const express = require('express');
const { readAlbums } = require('../controllers/albums');

const albumRouter = express.Router();

albumRouter.route('/').get(readAlbums);

module.exports = albumRouter;
