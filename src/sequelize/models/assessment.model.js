const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('assessment', {
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Draft"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};