const getAllPlatforms = require('../controllers/getAllPlatforms');

const getPlatformsHander = async (req, res) => {
    try {

        const AllPlatforms = await getAllPlatforms();

        res.status(200).json(AllPlatforms);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPlatformsHander
}