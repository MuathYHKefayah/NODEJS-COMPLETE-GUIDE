const express = require('express');
const path  = require('path')
const router =  express.Router();
const rootDir = require('../util/path')

const products = [];

// /admin/add-product => GET
router.get('/add-product',(req, res, next) => {
    // console.log('In another middleware!');
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button</form>'); // to send the response
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')) // this to serve html file
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html')) // this to serve html file
    res.render('add-product', { // add-product : the name of pug file
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    }) // will use the default template engine - ex:pug 

});

//app.post - only handle post requests
//app.get - only handle get requests

// app.use('/product', (req, res, next) => {

// /admin/add-product => POST

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/');
})
exports.routes = router;
exports.products =products;