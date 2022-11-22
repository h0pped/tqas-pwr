'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'rejection_reason', {
            type: Sequelize.STRING,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'rejection_reason')
    },
}