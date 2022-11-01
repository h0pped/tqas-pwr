const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('recovery_code', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        attempts_number: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
    })
}
