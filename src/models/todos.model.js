const {DataTypes} = require ('sequelize');
const db = require('../utils/database');

const Todos = db.define('todos', {
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Todos;