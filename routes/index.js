'use strict'

const express = require('express')
const api = express.Router()
const productController = require('../controllers/product')
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

api.get('/products', productController.getProducts)
api.get('/product/:id', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:id', productController.updateProduct)
api.delete('/product/:id', productController.deleteProduct)

api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Access successfully'})
})

api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)

module.exports = api