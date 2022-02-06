const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Flower = require('../database/models/flower.model')

const Color = sequelize.define('Color', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'color'
    },
}, {
    schema: 'flowers_store',
    tableName: 'colors',
    timestamps: false
})

module.exports = Color
