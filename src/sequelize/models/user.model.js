const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        academic_title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'not specified'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        account_status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'inactive'
        },
        status_date: {
            type: DataTypes.DATE
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false
        }});
};