const { DataTypes, STRING } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluation', {
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "ongoing"
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}
