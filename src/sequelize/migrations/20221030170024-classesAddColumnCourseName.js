'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('protocols', 'protocol_json', {
            type: Sequelize.STRING,
            allowNull: false,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('protocols', 'protocol_json')
    },
}