const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('evaluated_class', {
        accepted_by_dept_head: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }});
};