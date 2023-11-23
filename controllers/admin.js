const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { // add-product : the name of pug file
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        editing: false
    });
}


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({  // When I added an associations between product and user then createProduct method become available to use 
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    // Product.create(
    //     {
    //         title: title,
    //         price: price,
    //         imageUrl: imageUrl,
    //         description: description
    //     }
    // )
    .then(result => {
        console.log('PRODUCT CREATED!');
        res.redirect('/');
    })
    .catch(err =>  console.log(err));
    // const product = new Product(null, title, imageUrl, price, description);
    // //product.save();
    // product.save_SQL_BD()
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err))
   
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/')
    }
    const prodId = req.params.productId;
    // ----------------------------------------------------
    //---------------- Sequelize  -----------//
    req.user
        .getProducts({where: {id: prodId}})
         // Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if(!product){
                return res.redirect('/')
            }
            res.render('admin/edit-product', { // add-product : the name of pug file
                pageTitle: 'Edit Product',
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err))

    // Product.findById(prodId, product => {
    //     if(!product){
    //         return res.redirect('/')
    //     }
    //     res.render('admin/edit-product', { // add-product : the name of pug file
    //         pageTitle: 'Edit Product',
    //         path: "/admin/edit-product",
    //         editing: editMode,
    //         product: product
    //     });
    // })
   
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    
    Product.findByPk(prodId)
     .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
        return product.save(); // this is Sequelize save method 
     })
     .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
     } )
     .catch(err => console.log(err))


    // const updateProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    // updateProduct.save();

    
}

exports.getProducts = (req, res, next) => {

     // ----------------------------------------------------
    //---------------- Sequelize  -----------//
    req.user
    .getProducts()
    //Product.findAll()
    .then(products => {
        res.render('admin/products', { // products : the name of pug/handlebars/ejs file
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    })
    .catch(err => console.log(err))

    // Product.fetchAll((products) => {
    //     res.render('admin/products', { // products : the name of pug/handlebars/ejs file
    //         prods: products,
    //         pageTitle: 'Admin Products',
    //         path: '/admin/products'
    //     })
    // });

    // Product.fetchAll_SQL_BD()
    // .then(([rows, fieldData]) => {
    //     res.render('admin/products', { // products : the name of pug/handlebars/ejs file
    //         prods: rows,
    //         pageTitle: 'Admin Products',
    //         path: '/admin/products'
    //     })
    // })
    // .catch(err =>  console.log(err))

}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //Product.deleteById(prodId);
    Product.findByPk(prodId)
        .then(product => {
             return product.destroy();
        })
        .then(result => {
            console.log('PRODUCT DESTROYED');
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))

}

