const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('../config')
const cors = require('cors')
const FlowersListController = require('./controllers/flower-list.controller')
const FlowerByIdController = require('./controllers/flower-by-id.controller')
const OrdersByUserIdController = require('./controllers/orders-by-userId.controller')
const OrdersController = require('./controllers/orders.controller')

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.get('/products', FlowersListController)

app.get('/products/:id', FlowerByIdController)

app.get('/orders-history', OrdersByUserIdController)

app.post('/orders', OrdersController)

app.listen(PORT, () => {
    console.log(`Example app listen on ${PORT}`)
})