const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

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
    flower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'flower_id'
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
}, {
    schema: 'flowers_store',
    tableName: 'orders',
    timestamps: false
})

module.exports = Order
