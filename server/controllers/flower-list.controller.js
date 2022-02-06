const Flower = require('../database/models/flower.model')

async function flowersListController(req, res) {
    const result = await Flower.findAll()
    res.json(result)
}

module.exports = flowersListController
