'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'status', {
            allowNull: false,
            type: Sequelize.STRING,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'status')
    },
}