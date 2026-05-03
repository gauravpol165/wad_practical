const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔗 Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🎵 Schema
const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model("Song", songSchema);

// c) Insert 5 songs
app.get("/insert", async (req, res) => {
    await Song.deleteMany(); // reset
    await Song.insertMany([
        {songname:"Tum Hi Ho", film:"Aashiqui 2", music_director:"Mithoon", singer:"Arijit Singh"},
        {songname:"Kesariya", film:"Brahmastra", music_director:"Pritam", singer:"Arijit Singh"},
        {songname:"Malang", film:"Malang", music_director:"Mithoon", singer:"Ved Sharma"},
        {songname:"Kal Ho Na Ho", film:"KHNH", music_director:"Shankar", singer:"Sonu Nigam"},
        {songname:"Chaiyya Chaiyya", film:"Dil Se", music_director:"AR Rahman", singer:"Sukhwinder"}
    ]);
    res.send("5 Songs Inserted");
});

// d & k) Count + display in table
app.get("/songs", async (req, res) => {
    const songs = await Song.find();
    let html = `<h2>Total Songs: ${songs.length}</h2>
    <table>
    <tr>
        <th>Song</th><th>Film</th><th>Director</th>
        <th>Singer</th><th>Actor</th><th>Actress</th>
    </tr>`;

    songs.forEach(s => {
        html += `<tr>
            <td>${s.songname}</td>
            <td>${s.film}</td>
            <td>${s.music_director}</td>
            <td>${s.singer}</td>
            <td>${s.actor || "-"}</td>
            <td>${s.actress || "-"}</td>
        </tr>`;
    });

    html += "</table>";
    res.send(html);
});

// e) Songs by Music Director
app.get("/director/:name", async (req, res) => {
    const data = await Song.find({ music_director: req.params.name });
    res.json(data);
});

// f) Songs by Director + Singer
app.get("/director-singer", async (req, res) => {
    const data = await Song.find({
        music_director: req.query.director,
        singer: req.query.singer
    });
    res.json(data);
});

// i) Songs by Singer + Film
app.get("/film-singer", async (req, res) => {
    const data = await Song.find({
        film: req.query.film,
        singer: req.query.singer
    });
    res.json(data);
});

// g) Delete
app.get("/delete/:name", async (req, res) => {
    await Song.deleteOne({ songname: req.params.name });
    res.send("Deleted");
});

// h) Add new song
app.get("/addsong", async (req, res) => {
    await Song.create({
        songname: req.query.songname,
        film: req.query.film,
        music_director: req.query.director,
        singer: req.query.singer,
        actor: req.query.actor,
        actress: req.query.actress
    });
    res.send("Song Added");
});

// j) Update actor & actress
app.get("/update", async (req, res) => {
    await Song.updateOne(
        { songname: req.query.songname },
        { $set: { actor: req.query.actor, actress: req.query.actress } }
    );
    res.send("Updated");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});