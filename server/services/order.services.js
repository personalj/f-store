const Flower = require('../database/models/flower.model')

async function checkOrder(data) {
    const flower_list = await Flower.findAll({
        where: {
            id: [...orderProductIds(data)]
        }
    })
    let response = { success: true }
    const errMessage = []
    await flower_list.forEach(product => {
        const order = data.find(order => order.product_id === product.id)
        if (order.quantity > product.quantity) {
            errMessage.push({
                msg: `${product.title} amount unavailable`,
                product_id: product.id,
                available_amount: product.quantity
            })
            response = {
                success: false,
                data: errMessage
            }
        }
    })
    return response
}

function orderProductIds(ids) {
    const productIds = []

    for (const order of ids) {
        productIds.push(order.product_id)
    }

    return productIds
}

module.exports = {
    checkOrder
}
