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
            allowNull: false
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
            allowNull: false
        },
        status_date: {
            type: DataTypes.STRING
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false
        }});
};