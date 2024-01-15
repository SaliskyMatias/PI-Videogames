const { Videogame, Genre } = require('../DB_connection');
const { API_KEY } = process.env;
const axios = require('axios');

const getAllVideogamesDB = async () => {
    const videogameDB = await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }    
        }    
    });

    let videogameMap = videogameDB.map((videogame) => {
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platforms: videogame.platforms,
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.Genres.map((obj) => obj.name)
        }
    });

    return videogameMap;
}


const getAllVideogamesApi = async () => {
    let videogamesApi = [];

    const responses = await Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    ]);

    responses.forEach(async (response) => {
        videogamesApi = videogamesApi.concat(response.data.results);
    });

    const videogamesApiMap = videogamesApi.map((videogame) => {
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description || 'sin descripcion',
            platforms: videogame.platforms.map((obj) => obj.platform.name),
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map((genre) => genre.name)
        }
    });

    return videogamesApiMap;
}


const getAllVideogames = async () => {
    try {
        const videogameDB = await getAllVideogamesDB(); // Videojuegos de la DB
        const videogameApi = await getAllVideogamesApi(); // Videojuegos de la API
        const allVideogames = [...videogameDB, ...videogameApi];
    
        return allVideogames;
        
    } catch (error) {
        throw new Error(`Error fetching videogames: ${error.message}`);
    }

}

module.exports = getAllVideogames;