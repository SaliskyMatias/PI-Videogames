const express = require('express');
const videogamesRouter = require('./videogamesRouter');
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');

const router = express.Router();

router.use('/videogames', videogamesRouter);

router.use('/genres', genresRouter);

router.use('/platforms', platformsRouter);

module.exports = router;
