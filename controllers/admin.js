const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { // add-product : the name of pug file
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        editing: false,
        isAuthenticated: req.isLoggedIn,
    });
}


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl,
        userId: req.user // you can just store the entire user and mongoose will just pick the ID from that 
    });

    product
    .save() // provided by mongoose and not defined by us
    .then(result => {
        console.log('PRODUCT CREATED!');
        res.redirect('/');
    })
    .catch(err =>  console.log(err));

   
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if(!product){
                return res.redirect('/')
            }
            res.render('admin/edit-product', { // add-product : the name of pug file
                pageTitle: 'Edit Product',
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
                isAuthenticated: req.isLoggedIn,
            });
        })
        .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    
    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl; 
            
            return product.save(); //save method defined by mongoose
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        } )
        .catch(err => console.log(err))
   
}

exports.getProducts = (req, res, next) => {
    Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
        // console.log(products);
        res.render('admin/products', { // products : the name of pug/handlebars/ejs file
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            isAuthenticated: req.isLoggedIn,
        })
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId) //findByIdAndDelete is defined by mongoose 
        .then(() => {
            console.log('PRODUCT DESTROYED');
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))

}

