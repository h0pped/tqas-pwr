'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'deletedAt', {
            allowNull: true,
            type: Sequelize.DATE,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'deletedAt')
    },
}