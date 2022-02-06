const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Flower = sequelize.define('Flower', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'description'
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'price'
    },
    color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'color_id'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity'
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'rate'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'image'
    },
}, {
    schema: 'flowers_store',
    tableName: 'flowers',
    timestamps: false
})

module.exports = Flower
