const { checkOrder } = require('../services/order.services')

function ordersController(req , res) {
    const data = req.body

    res.json(
        checkOrder(data)
    )
}

module.exports = ordersController