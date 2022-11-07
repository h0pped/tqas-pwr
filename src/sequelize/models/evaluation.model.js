const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluation', {
        details: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Draft',
        },
        enrolled_students: {
            type: DataTypes.STRING,
        }
    })
}
