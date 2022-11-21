'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.dropTable('questions')
    },

    async down(queryInterface, Sequelize) {
        return queryInterface
            .createTable('questions', {
                id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true
                },
                question_text: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                input_type: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
            })
    },
}
