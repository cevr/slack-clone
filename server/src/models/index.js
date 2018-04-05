import Sequelize from 'sequelize';
//initialize db
const sequelize = new Sequelize('slack-clone', 'postgres', '1052325895', {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    define: {
        //causes all names to be snake cased
        //this is needed because camel casing is not supported in SQL
        underscored: true
    }
});

const models = {
    User: sequelize.import('./user'),
    Team: sequelize.import('./team'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message')
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
