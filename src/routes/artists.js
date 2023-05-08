const express = require('express');
const { addArtist, readArtist } = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(addArtist);

artistRouter.get('/', readArtist);

module.exports = artistRouter;
