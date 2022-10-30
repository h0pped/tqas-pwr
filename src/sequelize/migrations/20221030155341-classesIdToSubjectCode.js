'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('evaluated_classes', 'id', 'subject_code');

    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.renameColumn('evaluated_classes', 'subject_code', 'id');
    },
}