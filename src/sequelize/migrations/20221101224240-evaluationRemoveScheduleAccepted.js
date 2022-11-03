'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluations', 'schedule_accepted')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluations', 'schedule_accepted', {
            allowNull: false,
            type: Sequelize.BOOLEAN,
        })
    },
}
