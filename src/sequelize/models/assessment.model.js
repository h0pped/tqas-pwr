const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('assessment', {
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date : {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }});
};