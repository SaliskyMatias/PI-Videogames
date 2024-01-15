const getAllGenres = require('../controllers/getAllGenres');

const getGenresHandler = async (req, res) => {
    try {
        const genresFound = await getAllGenres();

        res.status(200).json(genresFound);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getGenresHandler
}