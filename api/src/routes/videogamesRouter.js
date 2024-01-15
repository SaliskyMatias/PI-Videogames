const express = require('express');
const { getVideogamesHandler, 
    getVideogameIdHandler, 
    createVideogameHandler 
} = require('../handlers/videogamesHandler');

const validatePost = require('../middleware/index');

const videogamesRouter = express.Router();

videogamesRouter.get('/', getVideogamesHandler);

videogamesRouter.get('/:idVideogame', getVideogameIdHandler);

videogamesRouter.post('/', validatePost, createVideogameHandler);

module.exports = videogamesRouter;