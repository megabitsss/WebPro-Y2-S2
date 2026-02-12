// index.js

const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const port = 3000;

//เชื่อมต่อ database
const conn = require('./database.js');

app.use(express.static('public'));
//เวลาเรียก res.render() ให้ใช้ ejs แล้วไปดูใน folder views อีกที
app.set('view engine', 'ejs');
//รับข้อมูลจาก parse ข้อมูลจากฟอร์มที่เป็น method post
app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "/public/html/home.html"));
    res.render("home"); //ส่งเป็น template engine ถ้าใช้ render
});

app.get('/create', (req, res) => {
    const sql = `CREATE TABLE albums (
                id INT AUTO_INCREMENT PRIMARY KEY,
                song VARCHAR(255) NOT NULL,
                artist VARCHAR(255) NOT NULL,
                album VARCHAR(255) NOT NULL,
                year INT NOT NULL,
                genre VARCHAR(100),
                album_cover TEXT
                );`;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
});

app.get('/insert', (req, res) => {

    const results = [];

    fs.createReadStream(path.join(__dirname, 'albums.csv'))
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim()
        }))
        .on('data', (row) => {


            const year = parseInt(row.year);

            if (!row.song) {
                console.log("Row skipped because song is missing:", row);
                return;
            }

            results.push([
                row.song,
                row.artist,
                row.album,
                isNaN(year) ? null : year,
                row.genre,
                row.album_cover
            ]);
        })
        .on('end', () => {

            if (results.length === 0) {
                return res.send("No valid data found in CSV");
            }

            const sql = `
                INSERT INTO albums
                (song, artist, album, year, genre, album_cover)
                VALUES ?
            `;

            conn.query(sql, [results], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.send('Insert failed');
                }

                res.redirect('/albums');

            });

        });

});

app.get('/albums', (req, res) => {

    const sql = "SELECT * FROM songs";

    conn.query(sql, (err, result) => {
        if (err) throw err;

        res.render('albums', { data: result });
    });

});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

