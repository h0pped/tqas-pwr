'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('protocols', 'protocol_json', {
            type: Sequelize.STRING(50000),
            allowNull: false,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('protocols', 'protocol_json')
    },
}