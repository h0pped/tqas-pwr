const { Sequelize } = require('sequelize');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const modelDefiners = [
  require('./models/activation_code.model'),
  require('./models/answer_option.model'),
	require('./models/evaluated_class.model'),
	require('./models/evaluatee.model'),
	require('./models/evaluation_team.model'),
  require('./models/evaluation.model'),
	require('./models/protocol_answer.model'),
	require('./models/protocol_question.model'),
	require('./models/protocol.model'),
	require('./models/question.model'),
	require('./models/recovery_code.model'),
	require('./models/user.model'),
	require('./models/wzhz.model')
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

sequelize.models.user.hasOne(sequelize.models.recovery_code);
sequelize.models.user.hasOne(sequelize.models.activation_code);
sequelize.models.wzhz.hasOne(sequelize.models.user);
sequelize.models.user.hasOne(sequelize.models.evaluatee);
sequelize.models.user.belongsToMany(sequelize.models.evaluation, {through : sequelize.models.evaluation_team});
sequelize.models.evaluatee.hasMany(sequelize.models.evaluated_class);
sequelize.models.evaluated_class.hasMany(sequelize.models.evaluation);
sequelize.models.protocol_question.belongsTo(sequelize.models.protocol);
sequelize.models.protocol_question.belongsTo(sequelize.models.question);
sequelize.models.evaluation.hasOne(sequelize.models.protocol);
sequelize.models.evaluation.belongsToMany(sequelize.models.protocol_question, {through: sequelize.models.protocol_answer});
sequelize.models.question.hasMany(sequelize.models.answer_option);
sequelize.sync({force: true});
console.log("All models were synced!");
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;