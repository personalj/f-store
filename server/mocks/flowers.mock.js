const Flower = require('../models/flower.model')
const GetRate = require('../models/rate.model.js')


const flowers = [
    new Flower(1, 'White Roses by the Stems', 'Tenderness has its name. And the name is White Rose. Only you know the limit of your tenderness. So, we propose you to collect your own bouquet of white roses. It is so easy to do it and has your tenderness to be delivered for any occasion in Ukraine. Beloved lady, dear relative, business partner, an old friend in Ukraine - everybody will enjoy receiving the bouquet of tender pure white roses.',
        3, 20, 'https://kievdelivery.com/upload/products/260/one-white-rose.jpeg', 'white', ['roses', 'bestsellers'],
        new GetRate(50, 30, 40, 50, 10)),
    new Flower(2, '9 Red Tulips', 'This bouquet of tulips will win the heart of the recipient with its fragrance and freshness. But, please, allow us to propose you to add something special to these tulips.',
        25, 10, 'https://kievdelivery.com/upload/products/60/thumbs/9-red-tulips.jpeg', 'red', ['tulips'],
        new GetRate(0, 10, 40, 50, 100)),
    new Flower(3, 'Fresh White Mix', 'White roses, lilies, fragrant stock, lisianthus, and mini Gerbera daisies are gathered together in this Fresh White Mix. This is the right choice to show your feelings.',
        49, 7, 'https://kievdelivery.com/upload/products/133/fresh-white-mix.jpeg', 'white', ['roses', 'lilies', 'lisianthus', 'gerbera', 'bouquet'],
        new GetRate(0, 10, 200, 40, 100)),
    new Flower(4, '23 Pink Carnations', 'This flower bouquet will deliver bright and tender impressions to your recipient, guaranteed!',
        29, 2, 'https://kievdelivery.com/upload/products/43/23-elegant-pink-carnations.jpeg', 'pink', ['carnations'],
        new GetRate(0, 10, 200, 40, 800)),     
]

module.exports = flowers