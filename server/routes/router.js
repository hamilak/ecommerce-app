const express = require('express')
const route = express.Router()

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const authController = require("../controllers/authController")

// auth routes
route.post('/register', authController.register)
route.post('/login', authController.login)

// user routes
// route.post('/add-user', userController.create)
route.patch('update-user/:id', userController.update)
route.delete('/delete-user/:id', userController.delete)
route.get('/get-all-users', userController.getAll)

// product routes
route.post('/add-product', productController.create)
route.patch('/update-product/:id', productController.update)
route.delete('/delete-product/:id', productController.delete)
route.get('/get-all-products', productController.getAll)
route.get('/get-product/:id', productController.getOneProduct)

// cart routes
route.post('/add-to-cart/:userId/:id', cartController.addToCart)
route.get('/get-cart/:userId', cartController.getCart)

module.exports = route
