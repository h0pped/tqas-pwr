'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up(queryInterface, Sequelize) {
    return queryInterface
        .createTable('filled_protocols', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            filled_protocol_json: {
                type: Sequelize.STRING,
                allowNull: false
            },
            evaluationId: {
              type: Sequelize.INTEGER,
              allowNull: false
            },
            createdAt: {
              type: Sequelize.DATE,
              allowNull: false
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
            },
        })
        .then(() =>
            queryInterface.addConstraint('filled_protocols', {
                type: 'FOREIGN KEY',
                name: 'filled_protocols_evaluationId_fkey',
                references: {
                    table: 'evaluations',
                    field: 'id',
                },
                fields: ['evaluationId'],
            })
        )
},
    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('filled_protocols')
    },

}
