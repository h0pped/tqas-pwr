const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('evaluation_team', {
        is_head_of_evaluation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
};