const { getOrdersByUserId } = require('../services/historyOrders.services')

async function ordersByUserIdController(req , res) {
    const user_id = Number(req.header('user_id'))

    const result = await getOrdersByUserId(user_id)

    res.json(result)
}

module.exports = ordersByUserIdController
