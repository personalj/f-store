const Order = require('../database/models/order.model')
const Flower = require('../database/models/flower.model')

async function getOrdersByUserId(id) {
    const ordersFlowersIds = await Order.findAll({
        include: {
            model: Flower,
            attributes:['id', 'image', 'title', 'description', 'price', 'rate']
        },
        attributes: { exclude: ['flower_id', 'user_id'] },
        where: {
            user_id: id
        }
    })
    return ordersFlowersIds ? ordersFlowersIds : []
}

module.exports = {
    getOrdersByUserId
}
