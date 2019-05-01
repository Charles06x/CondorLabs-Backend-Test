'use strict'

const Product = require('../models/products');

var controller = {
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