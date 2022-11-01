const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('evaluation', {
        schedule_accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        occurences: {
            type: DataTypes.STRING,
            allowNull: false,
            default: false
        }});
};