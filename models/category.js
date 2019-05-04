'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = schema({
    categoryName: String
});

module.exports = mongoose.model('Category', CategorySchema);