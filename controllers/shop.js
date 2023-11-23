const Product = require('../models/product')
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    // Product.fetchAll((products) => {
    //     res.render('shop/product-list', { // shop : the name of pug/handlebars/ejs file
    //         prods: products,
    //         pageTitle: 'All Products',
    //         path: '/products'
    //     })
    // });
    
    // Product.fetchAll_SQL_BD()
    // .then(([rows, fieldData]) => {
    //     res.render('shop/product-list', { // shop : the name of pug/handlebars/ejs file
    //         prods: rows,
    //         pageTitle: 'All Products',
    //         path: '/products'
    //     })
    // })
    // .catch(err =>  console.log(err))

    Product.findAll()
     .then(products => {
        res.render('shop/product-list', { // shop : the name of pug/handlebars/ejs file
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        })
     })
     .catch(err => console.log(err))
    
}

exports.getProduct = (req, res,next) => {
    const prodId = req.params.productId;
    // Product.findById(prodId, product => {
    //     res.render('shop/product-detail', {
    //         product: product,
    //         pageTitle: product.title,
    //         path: '/products'
    //     })
    // })

    
    // ----------------------------------------------------
    //---------------- SQL statements  -----------//
    // Product.findById_SQL_DB(prodId)
    //     .then(([product]) => {
    //         res.render('shop/product-detail', {
    //             product: product[0],
    //             pageTitle: product[0].title,
    //             path: '/products'
    //         })
    //     })
    //     .catch(err => console.log(err))
        
    
    
    // ----------------------------------------------------
    //---------------- Sequelize  -----------//
    // Product.findAll({where: {id: prodId}})
    // .then((products) => {
    //     res.render('shop/product-detail', {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path: '/products'
    //     })
    // })
    // .catch(err => console.log(err))
    
    // OR

    Product.findByPk(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(err => console.log(err))   

    // ----------------------------------------------------

}


exports.getIndex = (req, res,next) => {
    // Product.fetchAll((products) => {
    //     res.render('shop/index', { // shop : the name of pug/handlebars/ejs file
    //         prods: products,
    //         pageTitle: 'Shop',
    //         path: '/'
    //     })
    // });
    // Product.fetchAll_SQL_BD()
    //     .then(([rows, fieldData]) => {
    //             res.render('shop/index', { // shop : the name of pug/handlebars/ejs file
    //             prods: rows,
    //             pageTitle: 'Shop',
    //             path: '/'
    //          })
    //     })
    //     .catch(err =>  console.log(err))


    
    // ----------------------------------------------------
    //---------------- Sequelize  -----------//

    Product.findAll()
     .then(products => {
        res.render('shop/index', { // shop : the name of pug/handlebars/ejs file
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        })
     })
     .catch(err => console.log(err))
    
     // ----------------------------------------------------

}


exports.getCart = (req, res,next) => {
    
    //-------------------------Sequelize ---------------//
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))



   // --------------------------------------------------
        //Cart.getCart(cart => {
        // Product.fetchAll(products => {
        //     const cartProducts = [];
        //     for (let product of products){
        //         const cartProductData = cart.products.find(prod => prod.id === product.id)
        //         if(cartProductData){
        //             cartProducts.push({productData: product, qty: cartProductData.qty})
        //         }
        //     }
        //     res.render('shop/cart', {
        //         path: '/cart',
        //         pageTitle: 'Your Cart',
        //         products: cartProducts
        //     })
        // })

        
        // ---------------------- SQL ------------------//

        // Product.fetchAll_SQL_BD()
        // .then(([rows, fieldData]) => {
        //     const cartProducts = [];
        //     for (let product of rows){
        //         const cartProductData = cart.products.find(prod => prod.id === product.id)
        //         if(cartProductData){
        //             cartProducts.push({productData: product, qty: cartProductData.qty})
        //         }
        //     }
        //     res.render('shop/cart', {
        //         path: '/cart',
        //         pageTitle: 'Your Cart',
        //         products: cartProducts
        //     })
        // })
        // .catch(err =>  console.log(err))
        
    //})
   
}

exports.postCart = (req, res,next) => {
   const prodId = req.body.productId;
   let fetchedCart;
   let newQuantity = 1;

   req.user
    .getCart()
    .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}})
    })
    .then(products => {
        let product;
        if(products.length > 0){
            product = products[0];
            
        }

        if(product){ // Add Existing products to cart
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(prodId)        
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
                through: {quantity: newQuantity}
            })
    })
    .then(() => {
            res.redirect('/cart')
    })
    .catch(err => console.log(err))


// ------------------------------------------------------
//    Product.findById(prodId, product => {
//         Cart.addProduct(prodId, product.price)
//    })
  
}

exports.postCartDeleteProduct = (req, res,next) => {
   const prodId = req.body.productId;
   req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
  
//     Product.findByPk(prodId, product => {
//     Cart.deleteProduct(prodId, product.price);
//         res.redirect('/cart');
//    })
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
            .then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = { quantity : product.cartItem.quantity}
                    return product;
                }))
            })
            .catch(err => console.log(err))
        })
        .then(result => {
            // to delete the cart items after order them
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res,next) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
             })
        })
        .catch(err => console.log(err))
}

exports.getCheckout = (req, res,next) => {
    res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
    })
}


