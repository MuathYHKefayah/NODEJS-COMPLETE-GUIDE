const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin'); // its a valid middleware
const shopRoutes = require('./routes/shop'); // its a valid middleware
const authRoutes = require('./routes/auth'); // its a valid middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public'))) // to serve public files

app.use((req,res, next) => {
    User.findById("65670a5f457926ef3a4e3573") //findById created by mongoose
        .then(user => {
            req.user = user;

            next();
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404)

mongoose
    .connect(
        'mongodb+srv://moath-kefayah:IM7OiYkIwpQrnNxe@atlascluster.gkddcxc.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(result => {
        // console.log(result);
        User.findOne().then(user => {
            if(!user){
                const user = new User({
                    name: 'Moath',
                    email: 'moath.kefayah@exalt.ps',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
      
        app.listen(3000)
    })
    .catch(err => {
        console.log(err);
    })
