const { geFlowerById } = require('../services/flower.services')

async function flowerByIdController(req , res) {
    const result = await geFlowerById(Number(req.params.id))

    res.json(result)
}

module.exports = flowerByIdController
