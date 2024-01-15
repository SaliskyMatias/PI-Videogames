require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const VideogameModel = require('./models/Videogame');
const GenreModel = require('./models/Genre');
const PlatformModel = require('./models/Platform');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, { 
    logging: false, 
    native: false 
});

VideogameModel(sequelize);
GenreModel(sequelize);
PlatformModel(sequelize);

const { Videogame, Genre, Platform } = sequelize.models;

// Defino la relación N:N entre Videogame y Genre
Videogame.belongsToMany(Genre, { through: 'videogame_genre' });
Genre.belongsToMany(Videogame, { through: 'videogame_genre' });

// Defino la relación N:N entre Videogame y platform
Videogame.belongsToMany(Platform, { through: 'videogame_platform' });
Platform.belongsToMany(Videogame, { through: 'videogame_platform' });


module.exports = {
    Videogame,
    Genre,
    Platform,
    conn: sequelize
}