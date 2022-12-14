const { Sequelize, DataTypes } = require('sequelize')
const { database } = require('../config/database.config')

const sequelize = new Sequelize(database, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    })

const modelDefiners = [
    require('./models/activation_code.model'),
    require('./models/evaluatee.model'),
    require('./models/evaluation_team.model'),
    require('./models/evaluation.model'),
    require('./models/protocol.model'),
    require('./models/recovery_code.model'),
    require('./models/user.model'),
    require('./models/wzhz.model'),
    require('./models/assessment.model'),
    require('./models/course.model'),
    require('./models/filled_protocol.model'),
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize)
}

sequelize.models.user.hasOne(sequelize.models.recovery_code)
sequelize.models.user.hasOne(sequelize.models.activation_code)
sequelize.models.user.hasOne(sequelize.models.wzhz)
sequelize.models.user.hasOne(sequelize.models.evaluatee, {
    foreignKey: { unique: true },
})
sequelize.models.evaluation.belongsToMany(sequelize.models.user, {
    as: 'evaluation_team_of_evaluation',
    through: sequelize.models.evaluation_team,
})
sequelize.models.user.belongsToMany(sequelize.models.evaluation, {
    as: 'evaluations_performed_by_user',
    through: sequelize.models.evaluation_team,
})

sequelize.models.evaluation.belongsTo(sequelize.models.protocol)
sequelize.models.protocol.hasMany(sequelize.models.evaluation)

sequelize.models.evaluation.belongsTo(sequelize.models.evaluatee)
sequelize.models.evaluatee.hasMany(sequelize.models.evaluation)
sequelize.models.evaluatee.belongsTo(sequelize.models.user)
sequelize.models.evaluation.belongsTo(sequelize.models.course, {
    foreignKey: { name: 'course_code', type: DataTypes.STRING },
})
sequelize.models.course.hasMany(sequelize.models.evaluation, {
    foreignKey: { name: 'course_code', type: DataTypes.STRING },
})
sequelize.models.evaluation.belongsTo(sequelize.models.assessment)
sequelize.models.assessment.hasMany(sequelize.models.evaluation)
sequelize.models.assessment.belongsTo(sequelize.models.user, {
    foreignKey: 'supervisor_id',
})

sequelize.models.protocol.hasMany(sequelize.models.evaluation)
sequelize.models.evaluation.belongsTo(sequelize.models.protocol)

sequelize.models.filled_protocol.belongsTo(sequelize.models.evaluation)
sequelize.models.evaluation.hasOne(sequelize.models.filled_protocol)

sequelize.sync()

console.log('All models were synced!')
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
