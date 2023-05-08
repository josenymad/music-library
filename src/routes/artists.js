const express = require('express');
const { artistController } = require('../controllers/artists');

const artistRouter = express.Router();

artistRouter.route('/').post(artistController);

module.exports = artistRouter;

console.log('src/routes/artists');
