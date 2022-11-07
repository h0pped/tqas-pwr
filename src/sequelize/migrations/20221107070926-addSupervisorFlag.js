'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'is_supervisor', {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('users', 'is_supervisor')
    },
}