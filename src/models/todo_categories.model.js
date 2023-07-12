const {DataTypes} = require('sequelize');
const db = require('../utils/database');

const TodoCategories = db.define('todo_categories',{
    todo_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false, 
});

module.exports = TodoCategories;