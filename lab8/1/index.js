// index.js

const express = require('express');
const path = require('path');
const app = express();
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

app.get('/display', (req, res) => {
    const sql = 'SELECT * from Users;';
    conn.query(sql, (err, result) => { //result เป็น array ของ object (row) ที่ query มาได้
        if (err) throw err;
        console.log(result);
        res.render('display', { data: result} ); //{data:result} obj ที่ส่งเข้าไปใน template ejs
    });
});

app.get('/create', (req, res) => {
    const sql = `CREATE TABLE Users (
                username varchar(20) not null,
                password varchar(15) not null,
                email varchar(20) not null,
                firstname varchar(20) not null,
                lastname varchar(20) not null,
                age int not null,
                address varchar(50) not null,
                phone varchar(10) not null,
                PRIMARY KEY(username));`;
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
});

app.get('/formget', (req, res) => {
    const { username, password, email, fname, lname, age, address, phone } = req.query;
    const insertSql = "INSERT INTO Users (username, password, email, firstname, lastname, age, address, phone) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    conn.query(insertSql, [username, password, email, fname, lname, age, address, phone], (err, result) => { //เอาค่าใน array ไปแทน ? ใน string insertSql ตามลำดับ
        if (err) throw err;
        console.log("Data inserted");
        res.render("inserted");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

