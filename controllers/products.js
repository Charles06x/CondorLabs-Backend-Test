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

    //Gets one product given an ID
    getProduct: function(req, res){
        const id = req.params.id;

        if(id === null || id === "") return res.status(404).send({message: "No id provided."});

        Product.findById(id, (err, product) => {
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

    getCategories: function(req, res){
        var l = []
        Product.find().exec((err, products) => {
            if (err) return res.status(500).send({message: "An error has ocurred.", error: err});

            if(!products) return res.status(404).send({message: "No Categories were found."});

            products.map(product => {
                if(!l.includes(product.productCategory)){
                    l.push(product.productCategory)
                }
                
            })

            return res.status(200).send({categories: l});
        })
    },

    //Post methods.
    //Saves a new product to the database.
    saveProduct: function(req, res) {
        var product = new Product();
        

        var params = req.body
        
        product.productName = params.productName;
        product.productPrice = params.productPrice;
        product.productSeller = params.productSeller;
        product.productDescription = params.productDescription;
        product.productCategory = params.productCategory;
        product.productQuantity = (params.productQuantity != null) ? params.productQuantity: 0;
        product.productImg = (params.productImg != null) ? params.productImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Simple_cardboard_box.svg/1280px-Simple_cardboard_box.svg.png";
        
        if(product.productName != null & product.productPrice != null & product.productSeller != null & product.productCategory != null){
            product.save((err, productStoraged) => {
                if(err) return res.status(500).send({message: "An error has occurred while saving document.", error: err});

                if(!productStoraged) return res.status(404).send({message: "product not saved."})

                return res.status(200).send({product: productStoraged})
            });
        }else{
            return res.status(406).send({message: "Bad Request"});
        }
       

    },

    updateProduct: function(req, res) {       
        var id = req.params.id;

        var params = req.body

        var productToBeUpdated = {
            "_id": id,
            "productName": params.productName,
            "productPrice": params.productPrice,
            "productSeller": params.productSeller,
            "productDescription": params.productDescription,
            "productCategory": params.productCategory,
            "productQuantity": (params.productQuantity != null) ? params.productQuantity: 0,
            "productImg": (params.productImg != null) ? params.productImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Simple_cardboard_box.svg/1280px-Simple_cardboard_box.svg.png"
        }
        
        if(productToBeUpdated.productName != null & productToBeUpdated.productPrice != null & productToBeUpdated.productSeller != null & productToBeUpdated.productCategory != null){
            Product.findByIdAndUpdate(id, productToBeUpdated, {new: true}, (err, product) => {
                if (err) return res.status(500).send({message: "An error has ocurred.", error: err});

                if(!product) return res.status(404).send({message: "No product was found."});

                return res.status(200).send({product: product});
            })
        }else{
            return res.status(406).send({message: "Bad Request"});
        }     

    },

    deleteProduct: function(req, res) {
        var id = req.params.id;

        if(id){
            Product.findByIdAndDelete(id, (err, productDeleted) => {
                if (err) return res.status(500).send({message: "An error has ocurred.", error: err});

                if(!productDeleted) return res.status(404).send({message: "No product was found."});

                return res.status(200).send({product: productDeleted});
            })
        }
    }
}

module.exports = controller;