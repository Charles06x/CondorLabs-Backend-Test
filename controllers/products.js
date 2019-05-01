'use strict'

const Product = require('../models/products');

var controller = {

    //Get methods
    //List all the products in the database (list of products).
    getAllProducts: function(req, res){
        Product.find({}).sort('productName').exec((err, products) => {
            if(err) return res.status(500).send({message: "An error has ocurred.", error: err});

            if(!products) return res.status(404).send({message: "Products not found."});

            return res.status(200).send({products});
        });
    },

    //Returns one product, given a name. (Search products and details).
    getProduct: function(req, res){
        const productName = req.params.productName;

        //if(productName == null) return res.status(404).send({message: "No name provided."});

        Product.find({productName: productName}).sort('productName').exec((err, product) => {
            if (err) return res.status(500).send({message: "An error has ocurred.", error: err});

            if(!product) return res.status(404).send({message: "No product was found."});

            return res.status(200).send({product: product});
        })

    },

    //Returns the products given a category (Display products by category).
    getProductsByCategory: function(req, res){
        const productCategory = req.params.productCategory;
        if(productCategory == null) return res.status(404).send({message: "No category provided."});

        Product.find({productCategory: productCategory}).sort('productName').exec((err, product) => {
            if (err) return res.status(500).send({message: "An error has ocurred.", error: err});

            if(!product) return res.status(404).send({message: "No product was found."});

            return res.status(200).send({product: product});
        })
    },

    //Post methods.
    //Saves a new product to the database.
    saveProduct: function(req, res){
        var product = new Product();
        

        var params = req.body
        
        product.productName = params.productName;
        product.productPrice = params.productPrice;
        product.productSeller = params.productSeller;
        product.productDescription = params.productDescription;
        product.productCategory = params.productCategory;
        product.productImg = null
        

        product.save((err, productStoraged) => {
            if(err) return res.status(500).send({message: "An error has occurred while saving document.", error: err});

            if(!productStoraged) return res.status(404).send({message: "product not saved."})

            return res.status(200).send({product: productStoraged})
        });

    }
}

module.exports = controller;