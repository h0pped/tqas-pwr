'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'enrolled_students', {
            type: Sequelize.STRING,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'enrolled_students')
    },
}