const { getOrdersByUserId } = require('../services/user.services')

function ordersByUserIdController(req , res) {
    const user_id = req.header('user_id')

    res.json(
        getOrdersByUserId(+user_id)
    )
}

module.exports = ordersByUserIdController