'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint(
                'evaluations',
                'evaluations_evaluatedClassId_fkey'
            ),
            queryInterface.changeColumn('evaluations', 'subject_code', {
                type: DataTypes.STRING,
                allowNull: false,
            }),
            queryInterface.changeColumn('evaluated_classes', 'subject_code', {
                type: DataTypes.STRING,
                allowNull: false,
            }),
            queryInterface.addConstraint('evaluations', {
                fields: ['subject_code'],
                type: 'foreign key',
                name: 'evaluations_evaluatedClassId_fkey',
                references: {
                    //Required field
                    table: 'evaluated_classes',
                    field: 'subject_code',
                },
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint(
                'evaluations',
                'evaluations_evaluatedClassId_fkey'
            ),
            queryInterface.changeColumn('evaluations', 'subject_code', {
                type: 'INTEGER USING CAST(subject_code as INTEGER)',
            }),
            queryInterface.sequelize.query(`ALTER TABLE "evaluated_classes" ALTER COLUMN "subject_code" SET DATA TYPE INTEGER USING CAST(subject_code as INTEGER); `),
            queryInterface.addConstraint('evaluations', {
                fields: ['subject_code'],
                type: 'foreign key',
                name: 'evaluations_evaluatedClassId_fkey',
                references: {
                    //Required field
                    table: 'evaluated_classes',
                    field: 'subject_code',
                },
            }),
        ])
    },
}
