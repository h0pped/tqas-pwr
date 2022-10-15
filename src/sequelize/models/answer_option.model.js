const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('answer_option', {
        option: {
            type: DataTypes.STRING,
            allowNull: false
        }});
};