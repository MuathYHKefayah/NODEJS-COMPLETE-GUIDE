const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
const db = require('./util/database')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin'); // its a valid middleware
const shopRouters = require('./routes/shop'); // its a valid middleware

db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public'))) // to serve public files
app.use('/admin', adminRoutes.routes);
app.use(shopRouters);

app.use(errorController.get404)

app.listen(3000);