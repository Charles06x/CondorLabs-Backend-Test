'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Category = require('./category');

const ProductSchema = schema({
    productName: String,
    productDescription: String,
    productCategory: [{type: schema.Types.ObjectId, ref: 'Category'}],
    productPrice: Number,
    productSeller: String,
    productQuantity: Number,
    productImg: String
});

module.exports = mongoose.model('Product', ProductSchema);