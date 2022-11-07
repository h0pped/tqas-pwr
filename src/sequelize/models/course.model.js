const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('course', {
        course_code: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }});
};