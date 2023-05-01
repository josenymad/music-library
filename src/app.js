const express = require('express');
const artistRouter = require('./routes/artists');
const app = express();

app.use('/artists', artistRouter);

module.exports = app;