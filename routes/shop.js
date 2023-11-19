const express = require('express');
const path = require('path');

const router =  express.Router();
const rootDir = require('../util/path')

const adminData = require('./admin');

// app.use('/',(req, res, next) => {
//     // console.log('This always runs!');
//     next(); // Allows the request to continue to the next middleware in line
// }); // to add new middleware function

router.get('/',(req, res, next) => {
    // console.log('In another middleware!');
    // res.send('<h1>Hello from Express!</h1>'); // to send the response
    console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html')) // this to serve html file
    const products = adminData.products;
    res.render('shop', { // shop : the name of pug file
        prods: products,
        pageTitle: 'My Shop',
        path: '/',
        hasProducts: products.length > 0, //Note: this only for handlebars: hbs is accepting just boolean vars inside the template because you can't run any logic inside the hbs template
        activeShop: true,
        productCSS: true
    }) // will use the default template engine - ex:pug 
}); 


module.exports = router;