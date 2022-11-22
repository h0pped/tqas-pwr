'use strict'

const { promises } = require('nodemailer/lib/xoauth2')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.dropTable('protocol_questions')
    },

    async down(queryInterface, Sequelize) {
        return queryInterface
            .createTable('protocol_questions', {
                protocolId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                questionId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
            })
            .then(() =>
                queryInterface.addConstraint('protocol_questions', {
                    type: 'FOREIGN KEY',
                    name: 'protocol_questions_protocolId_fkey',
                    references: {
                        table: 'protocols',
                        field: 'id',
                    },
                    fields: ['protocolId'],
                })
            )
            .then(() =>
            queryInterface.addConstraint('protocol_questions', {
                type: 'FOREIGN KEY',
                name: 'protocol_questions_questionId_fkey',
                references: {
                    table: 'questions',
                    field: 'id',
                },
                fields: ['questionId'],
            })
        )
    },
}
