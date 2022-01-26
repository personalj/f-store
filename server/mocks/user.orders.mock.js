const UserOrders = require('../models/user.orders.model')

const Orders = [
    new UserOrders(1, [1, 3, 4]),
    new UserOrders(2, [2, 4])
]

module.exports = Orders