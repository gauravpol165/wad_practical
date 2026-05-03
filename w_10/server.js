const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const filePath = path.join(__dirname, "tasks.json");

// GET all tasks
app.get("/api/tasks", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error" });
        res.json(JSON.parse(data));
    });
});

// ADD task
app.post("/api/tasks", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        let tasks = JSON.parse(data);

        let newTask = {
            id: Date.now(),
            text: req.body.text
        };

        tasks.push(newTask);

        fs.writeFile(filePath, JSON.stringify(tasks), () => {
            res.json(newTask);
        });
    });
});

// UPDATE task
app.put("/api/tasks/:id", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        let tasks = JSON.parse(data);
        let id = parseInt(req.params.id);

        tasks = tasks.map(t => {
            if (t.id === id) {
                t.text = req.body.text;
            }
            return t;
        });

        fs.writeFile(filePath, JSON.stringify(tasks), () => {
            res.json({ message: "updated" });
        });
    });
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        let tasks = JSON.parse(data);
        let id = parseInt(req.params.id);

        tasks = tasks.filter(t => t.id !== id);

        fs.writeFile(filePath, JSON.stringify(tasks), () => {
            res.json({ message: "deleted" });
        });
    });
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});