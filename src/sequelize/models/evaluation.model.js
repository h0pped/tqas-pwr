const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluation', {
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Draft'
        },
    })
}
