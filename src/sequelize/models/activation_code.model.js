const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activation_code', {
        code: {
            type: DataTypes.UUID,
            allowNull: false
        }});
};