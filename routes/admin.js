const express = require('express');
const router =  express.Router();
const productsController = require('../controllers/products')


//app.post - only handle post requests
//app.get - only handle get requests

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct)

// /admin/add-product => POST
router.post('/add-product', productsController.postAddPRoduct)


exports.routes = router;
