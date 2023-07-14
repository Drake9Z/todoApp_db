const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Users = db.define(
'users',{
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},{
    timestamps: false,
}
);

module.exports = Users;