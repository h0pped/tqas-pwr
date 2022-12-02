'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('filled_protocols', 'status', {
            type: Sequelize.STRING,
            allowNull: false,
            default: 'Draft'
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('filled_protocols', 'status')
    },
}