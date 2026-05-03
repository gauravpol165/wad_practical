const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req , res) =>{
    // Set CORS headers for all responses to allow testing from Live Server or file://
    res.setHeader("Access-Control-Allow-Origin", "*");

    if(req.url == "/products"){
        fs.readFile("products.json" , (err , data) =>{
            if (err) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: "Failed to read products"}));
                return;
            }
            res.writeHead(200 , {"Content-Type":"application/json"});
            res.end(data)
        })
    }else if(req.url.startsWith("/images")){
        let filePath = "." + req.url;
        fs.readFile(filePath , (err , data) =>{
            if(err){
                res.writeHead(404);
                res.end("Not Found");
            }else{
                res.writeHead(200 , {"Content-Type":"image/jpeg"});
                res.end(data)
            }
        })
    }else if(req.url === "/"){
        fs.readFile("index.html" , (err , data) =>{
            if (err) {
                res.writeHead(404);
                res.end("index.html not found");
                return;
            }
            res.writeHead(200 , {"Content-Type":"text/html"});
            res.end(data);
        })
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 Not Found");
    }
})

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
