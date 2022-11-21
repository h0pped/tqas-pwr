const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('protocol', {
        protocol_json: {
            type: DataTypes.STRING,
            allowNull: false
        },
        protocol_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};