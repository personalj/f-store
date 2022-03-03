const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Flower = require('./flower.model')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date'
    },
    flower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'flower_id'
    },
}, {
    schema: 'flowers_store',
    tableName: 'orders',
    timestamps: false
})

Flower.hasMany(Order,  { foreignKey: 'flower_id' })
Order.belongsTo(Flower, { foreignKey: 'flower_id' })

module.exports = Order
