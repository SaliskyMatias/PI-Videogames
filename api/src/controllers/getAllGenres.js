const { Genre } = require('../DB_connection');
const { API_KEY } = process.env;

const getGenresApi = async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);

        const data = await response.json();
    
        const genresApi = data.results.map((genre) => genre.name);
    
        genresApi.forEach(async (genre) => {
            await Genre.findOrCreate({
                where: { name: genre }
            });
        });
    
        return genresApi;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllGenres = async () => {

    const genresDB = await Genre.findAll();

    if(!genresDB.length) {

        const genresApi = await getGenresApi();
        
        return genresApi;
    } 

    return genresDB.map((obj) => obj.name);
} 

module.exports = getAllGenres;