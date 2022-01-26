const usersOrdersMock = require('../mocks/user.orders.mock')
const flowersMock = require('../mocks/flowers.mock')

function getOrdersByUserId(id) {
    const userOrders = usersOrdersMock.find(item => item.userId === id)
    return userOrders ? getFlowersByIds(userOrders.orders) : []
}

function getFlowersByIds(idList) {
    const flowersList = []

    for (const flowers of flowersMock) {
        if (!idList.includes(flowers.id)) {
            continue
        }

        flowersList.push(flowers)

        if (flowersList.length === idList.length) {
            break
        }
    }

    return flowersList
}

module.exports = {
    getOrdersByUserId
}