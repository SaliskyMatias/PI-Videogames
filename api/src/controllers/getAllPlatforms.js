const { API_KEY } = process.env;
const { Platform } = require('../DB_connection');


const getAllPlatforms = async () => {
    try {
        const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);

        const data = await response.json();
    
        const platforms = data.results;
    
        platforms.forEach(async (p) => {
            await Platform.findOrCreate({
                where: {
                    name: p.name,
                }
            })
        });
    
        const platformsDB = await Platform.findAll();

        const platformsFiltered = platformsDB.map((p) => p.name)
    
        return platformsFiltered;
        
    } catch (error) {
        throw new Error(`Error in getAllPlatforms: ${error.message}`);
    }

}


module.exports = getAllPlatforms;