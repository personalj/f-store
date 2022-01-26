const flowersMock = require('../mocks/flowers.mock')

function geFlowerById(id) {
    return  flowersMock.find(flower => flower.id === +id)
}

module.exports = {
    geFlowerById
}