'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'assessmentId', {
            allowNull: false,
            type: Sequelize.INTEGER,
        })
    },

    down: (queryInterface, Sequelize) => {
        return Promise.resolve() //FK is being deleted when the table that it refers to is dropped
    },
}