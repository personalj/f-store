const Flower = require('./models/flower.model')
const User = require('./models/user.model')
const Order = require('./models/order.model')
const Color = require('./models/color.model')

const { sequelize } = require('../database')
const { QueryTypes } = require('sequelize')

function syncDB() {
    Flower.sync()
    User.sync()
    Order.sync()
    Color.sync()
}

async function getModelsThatDontExist() {
    const modelsThatDoesNotExist = []

    const modelList = [
        Flower,
        User,
        Order
    ]

    for (const model of modelList) {
        const tableData = model.getTableName()

        try {
            await sequelize.query(
                `SELECT 1 + 1 as result FROM ${tableData.schema}${tableData.delimiter}${tableData.tableName}`,
                {
                    type: QueryTypes.SELECT,
                },
            )
        } catch (e) {
            if (e.name === 'SequelizeDatabaseError') {
                modelsThatDoesNotExist.push(model)
            } else {
                throw e
            }
        }
    }

    return modelsThatDoesNotExist
}

module.exports = {
    syncDB,
    getModelsThatDontExist
}


