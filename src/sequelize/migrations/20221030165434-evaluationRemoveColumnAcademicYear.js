'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'academic_year')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'academic_year', {
            allowNull: false,
            type: Sequelize.STRING,
        })
    },
}
