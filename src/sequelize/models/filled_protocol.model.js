const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('filled_protocol', {
        protocol_json: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};