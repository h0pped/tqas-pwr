'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('assessments', 'department', {
        type: Sequelize.STRING,
    })
},

down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('assessments', 'department')
},
};
