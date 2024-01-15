const { Op } = require('sequelize');
const { Videogame, Genre } = require('../DB_connection');
const { API_KEY } = process.env;

const getDbVideogameByName = async (name) => {
    const videogameDB = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
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


const getApiVideogameByName = async (name) => {

   const response = await fetch(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);

    const data = await response.json();

    const videogameApi = data.results.map((videogame) => {
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

    return videogameApi;
}


const getVideogameByName = async (name) => {
    try {
        const videogameDB = await getDbVideogameByName(name); 
        const videogameApi = await getApiVideogameByName(name); 
        const allVideogames = [...videogameDB, ...videogameApi];
    
        let allVideogamesFound = allVideogames.slice(0, 15);
    
        if(allVideogamesFound.length !== 0) {
            return allVideogamesFound;
        } else {
            throw new Error('No videogames found. Please try with another name');
        }
        
    } catch (error) {
        throw new Error(`Error fetching video games: ${error.message}`);
    }

}

module.exports = getVideogameByName;