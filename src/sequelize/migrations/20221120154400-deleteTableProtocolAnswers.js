'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.dropTable('protocol_answers')
    },

    async down(queryInterface, Sequelize) {
        return queryInterface
            .createTable('protocol_answers', {
                evaluationId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                protocolQuestionId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                answer: {
                  type: Sequelize.STRING,
              },
            })
            .then(() =>
                queryInterface.addConstraint('protocol_answers', {
                    type: 'FOREIGN KEY',
                    name: 'protocol_answers_evaluationId_fkey',
                    references: {
                        table: 'evaluations',
                        field: 'id',
                    },
                    fields: ['evaluationId'],
                })
            )
            .then(() =>
            queryInterface.addConstraint('protocol_answers', {
                type: 'FOREIGN KEY',
                name: 'protocol_answers_protocolQuestionId_fkey',
                references: {
                    table: 'protocol_questions',
                    field: 'id',
                },
                fields: ['protocolQuestionId'],
            })
        )
    },
}
