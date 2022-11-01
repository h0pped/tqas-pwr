'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'semester')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'semester', {
            allowNull: false,
            type: Sequelize.STRING,
        })
    },
}
