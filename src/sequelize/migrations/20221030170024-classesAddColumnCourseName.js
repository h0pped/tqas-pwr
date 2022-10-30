'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('evaluated_classes', 'course_name', {
            allowNull: false,
            type: Sequelize.STRING,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('evaluated_classes', 'course_name')
    },
}