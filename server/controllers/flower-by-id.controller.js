const { geFlowerById } = require('../services/flower.services')

function flowerByIdController(req , res) {
    const id = req.params.id

    res.json(
        geFlowerById(+id)
    )
}

module.exports = flowerByIdController