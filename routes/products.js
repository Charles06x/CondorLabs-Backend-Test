'use strict'

const express = require('express');
const ProductController = require('../controllers/products');

var router = express.Router();

//Get endpoints
router.post('/save-product', ProductController.saveProduct);

module.exports = router