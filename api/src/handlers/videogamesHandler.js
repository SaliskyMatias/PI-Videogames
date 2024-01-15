const getAllVideogames = require('../controllers/getAllVideogames');
const getVideogameById = require('../controllers/getVideogameById');
const getVideogameByName = require('../controllers/getVideogameByName');
const createVideogame = require('../controllers/createVideogame');

/* --------------- GET ALL VIDEOGAMES AND VIDEOGAMES BY NAME ------------------ */
const getVideogamesHandler = async (req, res) => {
    try {
        const { name } = req.query;

        const allVideogames = await getAllVideogames();
       
        if(name) {
            const videogame = await getVideogameByName(name.toLowerCase());
            res.status(200).json(videogame);

        } else {
            res.status(200).json(allVideogames);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/* --------------- GET VIDEOGAME BY ID ------------------ */
const getVideogameIdHandler = async (req, res) => {
    try {
        const { idVideogame } = req.params;

        const videogameFound = await getVideogameById(idVideogame);

        if(!videogameFound) {
            return res.status(404).json({error: 'videogame not found'});
        }

        res.status(200).json(videogameFound);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/* --------------- POST VIDEOGAME ------------------ */
const createVideogameHandler = async (req, res) => {
    try {
        const { name, description, platforms, background_image, released, rating, genres } = req.body;

        const videogameCreated = await createVideogame(name, description, platforms, background_image, released, rating, genres);
        
        res.status(201).json(videogameCreated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getVideogamesHandler,
    getVideogameIdHandler,
    createVideogameHandler,
};