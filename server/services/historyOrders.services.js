const Order = require('../database/models/order.model')

async function getOrdersByUserId(id) {
    const ordersFlowersIds = await Order.findAll({
        where: {
            user_id: id
        }
    })
    return ordersFlowersIds ? ordersFlowersIds : []
}

module.exports = {
    getOrdersByUserId
}
