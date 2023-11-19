const express = require('express');


const app = express();

app.use((req, res,next) => {
    console.log("First  Middleware");
    next();
});


app.use('/users', (req, res,next) => {
    console.log("/users middleware");
    res.send('<h1>The "Users App" Page</h1>');
});

app.use('/', (req, res, next) => {
    console.log("/ middleware");
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3003);