const flowersMock = require('../mocks/flowers.mock')

function checkOrder(data) {
    let response = {success: true}
    flowersMock.forEach(product => {
        data.forEach(order => {
            if (product.id === +order.id) {
                if (order.quantity > product.amount) {
                    response = {
                        success: false,
                        msg: `${product.title} amount unavailable`,
                        available_amount: product.amount
                    }
                }
            }
        })
    })
    return response
}

module.exports = {
    checkOrder
}