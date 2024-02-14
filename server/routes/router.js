const express = require('express')
const route = express.Router()

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')

// user routes
route.post('/add-user', userController.create)
route.patch('update-user/:id', userController.update)
route.delete('/delete-user/:id', userController.delete)

// product routes
route.post('/add-product', productController.create)
route.patch('/update-product/:id', productController.update)
route.delete('/delete-product/:id', productController.delete)

// cart routes
route.post('/add-to-cart/:id', cartController.addToCart)
route.delete('/remove-from-cart/:id', cartController.removeFromCart)
route.patch('/decrease-count/:id', cartController.decreaseCount)
route.patch('/increase-count/:id', cartController.increaseCount)

module.exports = route
