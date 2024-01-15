const express = require('express');
const { getGenresHandler } = require('../handlers/genresHandler');

const genresRouter = express.Router();

genresRouter.get('/', getGenresHandler);

module.exports = genresRouter;
