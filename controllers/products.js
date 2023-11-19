const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { // add-product : the name of pug file
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        productCSS: true,
        formsCSS: true,
        activeAddProduct: true
    });
}

exports.postAddPRoduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products =  Product.fetchAll((products) => {
        res.render('shop', { // shop : the name of pug file
            prods: products,
            pageTitle: 'My Shop',
            path: '/',
            hasProducts: products.length > 0, //Note: this only for handlebars: hbs is accepting just boolean vars inside the template because you can't run any logic inside the hbs template
            activeShop: true,
            productCSS: true
        }) // will use the default template engine - ex:pug 
    });
   
}