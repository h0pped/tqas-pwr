const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('evaluated_class', {
        subject_code: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        course_name: {
            type: DataTypes.STRING,
        },
    })
}
