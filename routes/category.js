'use strict'

const express = require('express');
const CategoryController = require('../controllers/category');

//Import the twt requirements.
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

var router = express.Router();

//Configure middleware for Authentication middleware.
//This scope was extracted from auth0.com quickstar document. 
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://condormarket.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'condormarket/api',
    issuer: `https://condormarket.auth0.com/`,
    algorithms: ['RS256']
  });

const savePermission = jwtAuthz(['create:products']);



//Get endpoints
router.get('/categories', CategoryController.getAllCategories);
router.get('/category/:id', CategoryController.getOneCategory);

//Post endpoints
//router.post('/products', checkJwt, savePermission, ProductController.saveProduct);  //This endpoint is secure for access token with create:products permissions (scope)
router.post('/category', CategoryController.saveCategory);  //This endpoint is secure for access token with create:products permissions (scope)

module.exports = router