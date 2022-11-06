'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint(
                'evaluations',
                'evaluations_subject_code_fkey'
            ),
            queryInterface.renameColumn(
                'evaluated_classes',
                'subject_code',
                'course_code'
            ),
            queryInterface.renameColumn(
                'evaluations',
                'subject_code',
                'course_code'
            ),
            queryInterface.addConstraint('evaluations', {
                fields: ['course_code'],
                type: 'foreign key',
                name: 'evaluations_course_code_fkey',
                references: {
                    //Required field
                    table: 'evaluated_classes',
                    field: 'course_code',
                },
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint(
                'evaluations',
                'evaluations_course_code_fkey'
            ),
            queryInterface.renameColumn(
                'evaluations',
                'course_code',
                'subject_code'
            ),
            queryInterface.renameColumn(
                'evaluated_classes',
                'course_code',
                'subject_code'
            ),
            queryInterface.addConstraint('evaluations', {
                fields: ['subject_code'],
                type: 'foreign key',
                name: 'evaluations_subject_code_fkey',
                references: {
                    //Required field
                    table: 'evaluated_classes',
                    field: 'subject_code',
                },
            }),
        ])
    },
}
