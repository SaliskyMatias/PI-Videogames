const { Videogame, Genre } = require('../DB_connection');
const { API_KEY } = process.env;

const getVideogameById = async (idVideogame) => {

    // Si el id no es un número, voy a buscar a la bbd. Me traigo del modelo Genre, el valor del atributo name (el genero).
    if(isNaN(idVideogame)) {
        const videogameFound = await Videogame.findOne({
            where: {
                id: idVideogame
            },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                } 
            }
        });

        const videogameFoundFiltered = {
            id: videogameFound.id,
            name: videogameFound.name,
            description: videogameFound.description,
            platforms: videogameFound.platforms,
            background_image: videogameFound.background_image,
            released: videogameFound.released,
            rating: videogameFound.rating,
            genres: videogameFound.Genres.map((obj) => obj.name)
        }

        return videogameFoundFiltered;

    }  
    
    // Si el id es un número, voy a buscar a la api
    if(!isNaN(idVideogame)) {

        const response = await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);

        const data = await response.json();

        const dataFiltered = {
            id: data.id,
            name: data.name,
            description: data.description || 'sin descripcion',
            platforms: data.platforms.map((obj) => obj.platform.name),
            background_image: data.background_image,
            released: data.released,
            rating: data.rating,
            genres: data.genres.map((genre) => genre.name)
        }

        return dataFiltered;
    } 
}

module.exports = getVideogameById;


