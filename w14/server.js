const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (frontend)
app.use(express.static("public"));

// API to get users
app.get("/api/users", (req, res) => {
   fs.readFile(path.join(__dirname, "users.json"), "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});