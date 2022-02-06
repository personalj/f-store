const { checkOrder } = require('../services/order.services')

async function ordersController(req , res) {
    const result = await checkOrder(req.body)

    res.json(result)
}

module.exports = ordersController
