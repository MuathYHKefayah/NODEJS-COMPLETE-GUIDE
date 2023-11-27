const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin'); // its a valid middleware
const shopRouters = require('./routes/shop'); // its a valid middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public'))) // to serve public files

app.use((req,res, next) => {
    User.findById("656457c084dd637a19d2eae6")
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);

            next();
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes.routes);
app.use(shopRouters);

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})