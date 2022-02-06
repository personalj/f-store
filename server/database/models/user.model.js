const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
    },
}, {
    schema: 'flowers_store',
    tableName: 'users',
    timestamps: false
})

module.exports = User
