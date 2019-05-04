'use strict'

const express = require('express');
const ProductController = require('../controllers/products');

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
router.get('/products', ProductController.getAllProducts);
router.get('/:productCategory/products', ProductController.getProductsByCategory);
router.get('/products/:productName', ProductController.getProduct);
router.get('/categories', ProductController.getCategories);

//Post endpoints
//router.post('/products', checkJwt, savePermission, ProductController.saveProduct);  //This endpoint is secure for access token with create:products permissions (scope)
router.post('/products', ProductController.saveProduct);  //This endpoint is secure for access token with create:products permissions (scope)

module.exports = router