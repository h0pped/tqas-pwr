const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('recovery_code', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
}
