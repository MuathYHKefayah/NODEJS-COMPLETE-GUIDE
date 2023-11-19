const express = require('express');
const adminRoutes = require('./routes/admin'); // its a valid middleware
const shopRouters = require('./routes/shop'); // its a valid middleware
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const errorController = require('./controllers/error')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public'))) // to serve public files
app.use('/admin', adminRoutes.routes);
app.use(shopRouters);

app.use(errorController.get404)

app.listen(3000);