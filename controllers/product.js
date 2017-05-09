'use strict'

const Product = require('../models/product');


function getProduct(req, res) {
    let id = req.params.id;

    Product.findById(id, (err, product) => {
        if (err) res.status(500).send(`Error to execute the request: ${err}`)
        if (!product) return res.status(404).send({message: `Product not found!`})

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({product})
    })
}

function getProducts(req, res) {
     Product.find({}, (err, products) => {
        if (err) res.status(500).send(`Error to execute the request: ${err}`)
        if (!products) return res.status(404).send({message: `Products not found!`})

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({products})
    })
}

function saveProduct(req, res) {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;

    product.save((err, productStored) =>{
        if (err) res.status(500).send({message: `Error to save the Product: ${err}`})
        res.status(200).send({message: productStored})
    })
}

function updateProduct(req, res) {
    let id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, (err, productUpdated) => {
        if (err) req.status(500).send({message: `Error to update the Product: ${err}`})
        res.status(200).send({product: productUpdated})
    })
}

function deleteProduct() {
    let id = req.params.id;

    Product.findById(id, (err, product) => {
        if (err) req.status(500).send({message: `Error to delete the Product: ${err}`})
        
        Product.remove(err => {
           if (err) req.status(500).send({message: `Error to delete the Product`})
           res.status(200).send({message: 'The product was removed.'})  
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}