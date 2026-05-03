const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
    // 1. Set file path
    let file = req.url === "/" ? "./public/index.html" : "./public" + req.url;
    
    // 2. Set file type
    let ext = path.extname(file);

    let type = "text/html";
    if (ext === ".css") type = "text/css";
    if (ext === ".jpg") type = "image/jpeg";
    if (ext === ".png") type = "image/png";

    // 3. Read and send file
    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not Found");
        }
        res.writeHead(200, { "Content-Type": type });
        res.end(data);
    });

}).listen(3000, () => console.log("Server on http://localhost:3000"));