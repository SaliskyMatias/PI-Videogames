const { Videogame, Genre } = require('../DB_connection');

const createVideogame = async (name, description, platforms, background_image, released, rating, genres) => {
    const newVideogame = await Videogame.create({
        name,
        description, 
        platforms, 
        background_image, 
        released, 
        rating
    });

    for (let i = 0; i < genres.length; i++) {
        let genreName = genres[i];
        let genreDB = await Genre.findOne({
            where: { name: genreName }
        });
 
        if(genreDB){
            await newVideogame.addGenre(genreDB);
        }else{
            throw Error(`Please try with another genre: ${genreName}`);
        }
    }

    const loadedVideogame = await newVideogame.getGenres();
    const genreNames = loadedVideogame.map(genre => genre.name);
    
    newVideogame.dataValues.genres = genreNames;

    return newVideogame;
}

module.exports = createVideogame;



