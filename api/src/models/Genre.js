const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genre',
    // Definición de las columnas de la tabla 'Genre'
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
}