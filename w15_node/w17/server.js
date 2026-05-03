const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req , res) =>{
    if(req.url === "/employees"){
        fs.readFile("employees.json" , (err , data) => {
           
            res.writeHead(200 , {"Content-Type":"application/json"});
            res.end(data);

        })
    }else if(req.url.startsWith("/images")){
        let filePath = "." + req.url;
        fs.readFile(filePath , (err , data)=>{
            if(err){
                res.writeHead(404);
                res.end("Not Found")
            }else{
                res.writeHead(200, {"Content-Type":"image/jpeg"})
                res.end(data);
            }
        })
    }else if(req.url === "/"){
        fs.readFile("index.html" , (err , data) =>{
        res.writeHead(200 , {"Content-Type":"text/html"});
        res.end(data);
        })
    }
});

server.listen(3000 , () =>{
    console.log("Server running on http://localhost:3000")
})
