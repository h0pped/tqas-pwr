const { DataTypes, STRING } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluation', {
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "ongoing"
        },
        occurrences: {
            type: DataTypes.STRING,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
}
