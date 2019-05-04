'use strict'

const Category = require('../models/category');

var controller = {

    getAllCategories: function(req, res){
        Category.find({}).sort('categoryName').exec((err, categories) => {
            if(err) return res.status(500).send({message: "An error has ocurred.", error: err});

            if(!categories) return res.status(404).send({message: "Categories not found."});

            return res.status(200).send({categories});
        });
    },

    getOneCategory: (req, res) => {
        var categoryId = req.params.id;

        if(categoryId == null) return res.status(404).send({message: "No ID submitted."})

        Category.findById(categoryId, (err, category) => {
            if(err) return res.status(500).send({message: "An error has occurred while saving document.", error: err});

            if(!category) return res.status(404).send({message: "Category not found."});

            return res.status(200).send({category: category});
        })
    },

    saveCategory: function(req, res){
        var category = new Category();

        var params = req.body;

        category.categoryName = params.categoryName;

        if(category.categoryName != null){
            category.save((err, categoryStoraged) => {
                if(err) return res.status(500).send({message: "An error has occurred while saving document.", error: err});

                if(!categoryStoraged) return res.status(404).send({message: "category not saved."})

                return res.status(200).send({category: categoryStoraged})
            } )
        }
    }
}

module.exports = controller