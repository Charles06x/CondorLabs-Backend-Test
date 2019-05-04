'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ProductSchema = schema({
    productName: String,
    productDescription: String,
    productCategory: String,
    productPrice: Number,
    productSeller: String,
    productQuantity: Number,
    productImg: String
});

module.exports = mongoose.model('Product', ProductSchema);