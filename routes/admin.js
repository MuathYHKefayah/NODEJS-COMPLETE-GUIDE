const express = require('express');
const router =  express.Router();
const adminController = require('../controllers/admin')


//app.post - only handle post requests
//app.get - only handle get requests

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddPRoduct);



exports.routes = router;
