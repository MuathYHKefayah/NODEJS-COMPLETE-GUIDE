//const http = require('http'); //http module
//const routes = require('./routes');
const express = require('express');
const adminData = require('./routes/admin'); // its a valid middleware
const shopRouters = require('./routes/shop'); // its a valid middleware
const path = require('path');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');

// const expressHbs = require('express-handlebars');
const app = express();

// handlebars name for engine - you can set any name you want like : hbs and you need to set the html file extension to this name
// app.engine('hbs', expressHbs({
//         layoutDir: '/views/layouts/', 
//         defaultLayout: 'main-layout', 
//         extname: 'hbs'
//     })); //handlebars it's not built in so you need to set the engine using engine function
// app.set('view engine', 'hbs');  

app.set('view engine', 'ejs');
//app.set('view engine', 'pug');  // bug it's built in so u can set the view engine using set function directly
app.set('views', 'views')

// console.log(routes.someText)
// const server = http.createServer(routes.handler);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public'))) // to serve public files
app.use('/admin', adminData.routes);
app.use(shopRouters);

app.use((req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>')
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
    res.status(404).render('404', { // 404 : the name of pug file
        pageTitle: '404',
        path: '/'
    }) // will use the default template engine - ex:pug 
})


// const server = http.createServer(app);


// server.listen(3000);

app.listen(3000);