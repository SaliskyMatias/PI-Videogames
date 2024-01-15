const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Platform',
    // Definición de las columnas de la tabla 'platform'
    {   
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
}

// type: DataTypes.ARRAY(DataTypes.STRING),
