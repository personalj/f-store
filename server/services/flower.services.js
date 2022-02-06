const Flower = require('../database/models/flower.model')

function geFlowerById(id) {
    return Flower.findByPk(Number(id))
}

module.exports = {
    geFlowerById
}
