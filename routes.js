const fs = require('fs');

const  requestHandler = (req, res) => {
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if(url === "/"){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }


    if(url === "/message" && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        }); //listen to certain events
    
        req.on('end', ()=> {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/')
            return res.end();
            // fs.writeFile('message.txt', message, err => {
            //     res.statusCode = 302;
            //     res.setHeader('Location', '/')
            //     return res.end();
            // })
        });
        

        
    }
    res.setHeader('Content-Type', 'text/html');
    // process.exit();
}


module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded test'
}; 
