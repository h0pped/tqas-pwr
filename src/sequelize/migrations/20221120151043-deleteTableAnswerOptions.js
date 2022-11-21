'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.dropTable('answer_options')
    },

    async down(queryInterface, Sequelize) {
        return queryInterface
            .createTable('answer_options', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                option: {
                    type: Sequelize.STRING,
                },
                questionId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            })
            .then(() =>
                queryInterface.addConstraint('answer_options', {
                    type: 'FOREIGN KEY',
                    name: 'answer_options_questionId_fkey',
                    references: {
                        table: 'questions',
                        field: 'id',
                    },
                    fields: ['questionId'],
                })
            )
    },
}
