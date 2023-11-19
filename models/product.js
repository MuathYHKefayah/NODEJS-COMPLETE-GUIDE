const products = [];

const fs  = require('fs');
const path = require('path');
const rootDir = require('../util/path');


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
    constructor(t){
        this.title = t;
    }

    save(){
       getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
       });
    }

    static fetchAll(callback){ // we set static to make sure this method called directly by the Product class because its a method for all products not for the product object
        getProductsFromFile(callback);
    }
}