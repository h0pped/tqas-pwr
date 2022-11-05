const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluated_class', {
        course_code: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        course_name: {
            type: DataTypes.STRING,
        },
    })
}
