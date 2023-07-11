const {Sequelize} = require('sequelize');

const db = new Sequelize({
    database: "todo_app_db",
    username: "alphonse",
    host: "localhost",
    port: "5432",
    password: "root",
    dialect: "postgres",
});

module.exports = db;