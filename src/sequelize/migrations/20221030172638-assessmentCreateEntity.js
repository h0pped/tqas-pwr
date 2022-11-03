module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface
          .createTable('assessments', {
              id: {
                  type: Sequelize.INTEGER.UNSIGNED,
                  autoIncrement: true,
                  primaryKey: true,
              },
              status: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  defaultValue: "ongoing"
              },
              name: {
                  type: Sequelize.STRING,
              },
              createdAt: {
                type: Sequelize.DATE,
                allowNull: false
              },
              updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
              }
          })
          .then(() =>
              queryInterface.addConstraint('evaluations', {
                  type: 'FOREIGN KEY',
                  name: 'FK_assessment_of_evaluation',
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
