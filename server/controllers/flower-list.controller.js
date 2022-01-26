const flowersMock = require('../mocks/flowers.mock')

function flowersListController(req, res) {
    res.json(flowersMock)
}

module.exports = flowersListController