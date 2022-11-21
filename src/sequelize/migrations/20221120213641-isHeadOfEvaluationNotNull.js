'use strict';

//NOTE!!! It is necessary to add some values to the column before performing this migration.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'evaluation_teams',
      'is_head_of_team',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'evaluation_teams',
      'is_head_of_team',
      {
        type: Sequelize.BOOLEAN,
      }
    );
  }
};
