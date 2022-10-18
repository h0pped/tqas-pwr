const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('evaluatee', {
        last_evaluated_date: DataTypes.DATEONLY 
    });
};