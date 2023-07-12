const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Categories = db.define('categories',{
    category: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
    }
},
{
    timestamps: false,
},);

module.exports = Categories;