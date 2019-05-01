'use strict'

const express = require('express');
const ProductController = require('../controllers/products');

var router = express.Router();

//Get endpoints
router.get('/products', ProductController.getAllProducts);
router.get('/categories/:productCategory', ProductController.getProductsByCategory);
router.get('/products/:productName', ProductController.getProduct);

//Post endpoints
router.post('/save-product', ProductController.saveProduct);

module.exports = router