const express = require('express');
const { getPlatformsHander } = require('../handlers/platformsHandler'); 
const platformsRouter = express.Router();

platformsRouter.get('/', getPlatformsHander);

module.exports = platformsRouter;