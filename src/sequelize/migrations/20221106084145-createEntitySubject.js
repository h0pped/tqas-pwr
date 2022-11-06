module.exports = {
    up: (queryInterface, Sequelize) => {
        return (
            queryInterface
                .createTable('courses', {
                    course_code: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        primaryKey: true,
                    },
                    course_name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                })
                .then(
                queryInterface.addColumn('evaluations', 'evaluateeId', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                })
                )
                .then(() =>
                    queryInterface.addConstraint('evaluations', {
                        type: 'FOREIGN KEY',
                        name: 'FK_evaluated_class_course',
                        references: {
                            table: 'courses',
                            field: 'course_code',
                        },
                        fields: ['course_code'],
                        onDelete: 'no action',
                        onUpdate: 'no action',
                    })
                )
                .then(() =>
                    queryInterface.addConstraint('evaluations', {
                        type: 'FOREIGN KEY',
                        name: 'FK_evaluated_class_teacher',
                        references: {
                            table: 'evaluatees',
                            field: 'id',
                        },
                        fields: ['evaluateeId'],
                        onDelete: 'no action',
                        onUpdate: 'no action',
                    })
                )
                .then(() => queryInterface.removeConstraint('evaluations', 'FK_evaluated_classes'))
                .then(() => queryInterface.dropTable('evaluated_classes'))
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface
            .removeConstraint('evaluations', 'FK_evaluated_class_course')
            .then(() =>
                queryInterface.removeConstraint(
                    'evaluations',
                    'FK_evaluated_class_teacher'
                )
            )
            .then(() => queryInterface.removeColumn('evaluations', 'evaluateeId'))
            .then(() =>
                queryInterface.createTable('evaluated_classes', {
                    course_code: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        primaryKey: true,
                    },
                    course_name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    evaluateeId: {
                        type: Sequelize.INTEGER,
                        allowNull: false
                    }
                })
            )
            .then(() =>
                queryInterface.addConstraint('evaluations', {
                    type: 'FOREIGN KEY',
                    name: 'FK_evaluated_classes',
                    references: {
                        table: 'evaluated_classes',
                        field: 'course_code',
                    },
                    fields: ['course_code'],
                    onDelete: 'no action',
                    onUpdate: 'no action',
                })
            )
            .then(() =>
                queryInterface.addConstraint('evaluated_classes', {
                    type: 'FOREIGN KEY',
                    name: 'FK_evaluated_class_teacher',
                    references: {
                        table: 'evaluatees',
                        field: 'id',
                    },
                    fields: ['evaluateeId'],
                    onDelete: 'no action',
                    onUpdate: 'no action',
                })
            )
            .then(() => queryInterface.dropTable('courses'))
    },
}
