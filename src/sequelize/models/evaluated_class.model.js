const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluated_class', {
        course_name: {
            type: DataTypes.STRING,
        },
    })
}
