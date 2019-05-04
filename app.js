'use strict'

const express = require('express'); // Express object

const app = express(); //Express type instance

const products_routes = require('./routes/products');
const categories_routes = require('./routes/category')

app.use(express.urlencoded({extended: false})); //For parsing payload
app.use(express.json()); //Every request is parsed into json format with this setting.

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});     //This allows Cross origin petitions, so that frontend comunicates with backend.

app.use('/api', products_routes); //Prepend /api to endpoints.
app.use('/api', categories_routes);

module.exports = app;