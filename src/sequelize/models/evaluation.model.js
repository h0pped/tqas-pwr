const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('evaluation', {
        semester: {
            type: DataTypes.STRING,
            allowNull: false
        },
        academic_year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule_accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }});
};