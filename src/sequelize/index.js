const { Sequelize, DataTypes } = require('sequelize')
const { any } = require('sequelize/lib/operators')
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
    require('./models/answer_option.model'),
    require('./models/evaluatee.model'),
    require('./models/evaluation_team.model'),
    require('./models/evaluation.model'),
    require('./models/protocol_answer.model'),
    require('./models/protocol_question.model'),
    require('./models/protocol.model'),
    require('./models/question.model'),
    require('./models/recovery_code.model'),
    require('./models/user.model'),
    require('./models/wzhz.model'),
    require('./models/assessment.model'),
    require('./models/course.model')
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
sequelize.models.user.belongsToMany(sequelize.models.evaluation, {
    through: sequelize.models.evaluation_team,
})
sequelize.models.protocol_question.belongsTo(sequelize.models.protocol)
sequelize.models.protocol_question.belongsTo(sequelize.models.question)
sequelize.models.evaluation.hasOne(sequelize.models.protocol)
sequelize.models.evaluation.belongsToMany(sequelize.models.protocol_question, {
    through: sequelize.models.protocol_answer,
})
sequelize.models.evaluation.belongsTo(sequelize.models.evaluatee)
sequelize.models.evaluatee.hasMany(sequelize.models.evaluation)
sequelize.models.evaluation.belongsTo(sequelize.models.course, {foreignKey: { name: 'course_code', type: DataTypes.STRING}})
sequelize.models.course.hasMany(sequelize.models.evaluation, {foreignKey: { name: 'course_code', type: DataTypes.STRING}})
sequelize.models.evaluation.belongsTo(sequelize.models.assessment)
sequelize.models.assessment.hasMany(sequelize.models.evaluation)
sequelize.models.assessment.belongsTo(sequelize.models.user, {foreignKey: 'supervisor_id'})
sequelize.models.question.hasMany(sequelize.models.answer_option)
sequelize.sync()

console.log('All models were synced!')
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
