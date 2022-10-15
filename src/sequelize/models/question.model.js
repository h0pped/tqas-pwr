const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('question', {
        question_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        input_type: {
            type: DataTypes.ENUM('number', 'multiple-choice', 'open'),
            allowNull: false
        }});
};