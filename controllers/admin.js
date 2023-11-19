const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { // add-product : the name of pug file
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        productCSS: true,
        formsCSS: true,
        activeAddProduct: true
    });
}

exports.postAddPRoduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { // products : the name of pug/handlebars/ejs file
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    });
}