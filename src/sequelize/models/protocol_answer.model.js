const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('protocol_answer', {
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        }});
};