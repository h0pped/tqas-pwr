'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('evaluations', 'evaluatedClassId', 'subject_code');

    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.renameColumn('evaluations', 'subject_code', 'evaluatedClassId');
    },
}