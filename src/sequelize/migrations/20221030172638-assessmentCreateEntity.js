module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface
          .createTable('assessments', {
              id: {
                  type: Sequelize.INTEGER.UNSIGNED,
                  autoIncrement: true,
                  primaryKey: true,
              },
              start_date: {
                  type: Sequelize.DATE,
                  allowNull: false,
              },
              end_date: {
                  type: Sequelize.DATE,
                  allowNull: false,
              },
              status: {
                  type: Sequelize.STRING,
                  allowNull: false,
              },
              name: {
                  type: Sequelize.STRING,
              },
          })
          .then(() =>
              queryInterface.addConstraint('evaluations', {
                  type: 'FOREIGN KEY',
                  name: 'FK_assessment_of_evaluation', // useful if using queryInterface.removeConstraint
                  references: {
                      table: 'assessments',
                      field: 'id',
                  },
                  fields: ['assessmentId'],
                  onDelete: 'no action',
                  onUpdate: 'no action',
              })
          )
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('evaluations', 'assessmentId').then(() =>  queryInterface.dropTable('assessments'))
  },
}
