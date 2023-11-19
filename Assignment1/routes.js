const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method= req.method;
    res.setHeader('Content-Type', 'text/html');
    if(url === "/"){
        res.write('<html>');
        res.write('<head><title>Assignment 1! | Add New User</title></head>');
        res.write('<body>');
        res.write('<h1>Hello welcome to my page</h1><br><br>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"></input><button type="submit">Add User</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === "/users"){
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>');
        res.write('<ul>');
        users.forEach(function(user){
            res.write(`<li>${user}</li>`);
        })
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');   
        return res.end();
    } else if(url === "/create-user" && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split("=")[1];
            console.log(user);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }
   
}

module.exports = {
    handler: requestHandler
}; 