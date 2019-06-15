const Sequelize = require('sequelize');
const env = require('dotenv')

env.config();
const sequelize = new Sequelize(process.env.DB_Database, process.env.DB_USER, process.env.DB_PWD, {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});

module.exports = sequelize;