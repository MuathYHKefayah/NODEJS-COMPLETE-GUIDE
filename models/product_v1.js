const products = [];
const db = require('../util/database');
const fs  = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const Cart = require('./cart');

const p = path.join(
    rootDir, 
    'data', 
    'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            callback([])
        } else {
            callback(JSON.parse(fileContent)); 
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
       
    }

    save(){
       getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
           
       });
    }

    save_SQL_BD(){
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            const updateProducts = products.filter(p => p.id !== id)
            fs.writeFile(p, JSON.stringify(updateProducts), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static deleteById_SQL_BD(){

    }

    static fetchAll(callback){ // we set static to make sure this method called directly by the Product class because its a method for all products not for the product object
        getProductsFromFile(callback);
    }
    
    static fetchAll_SQL_BD(callback){ // we set static to make sure this method called directly by the Product class because its a method for all products not for the product object
        return db.execute('SELECT * FROM products')
    }


    static findById(id, callback){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            callback(product)
        })
    }

    static findById_SQL_DB(id){
       return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    }
}