'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluation_teams', 'is_head_of_team', {
            type: Sequelize.BOOLEAN
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluation_teams', 'is_head_of_team')
    },
}