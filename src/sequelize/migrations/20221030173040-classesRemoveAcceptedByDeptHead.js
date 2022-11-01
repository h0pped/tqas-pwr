'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluated_classes', 'accepted_by_dept_head')
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluated_classes', 'accepted_by_dept_head', {
            allowNull: false,
            type: Sequelize.STRING,
        })
    },
}
