// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');

// static resourse & template engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs'); //ไม่ต้องใช้ require -> ให้ใช้แบบนี้ (view engine คือส่วนที่ใช้แสดงผล) -> views
// For parsing form data
app.use(express.urlencoded({ extended: true }));

// routing
app.get('/', (req, res) => {
    res.send(`<a href="/create">Create Table</a><br>
            <a href="/insert">Insert Data</a><br>
            <a href="/showdata">Show Data</a><br>
            <a href="/form">Instructor Form</a><br>`);
});

app.get('/create',  (req, res) => {
    // Create table in MySQL database (CREATE TABLE IF NOT EXISTS instructor?)
    const sql = `CREATE TABLE instructor (
                id int not null,
                name varchar(20) not null,
                dept_name varchar(20) not null,
                salary float,
                PRIMARY KEY(id))`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table
});

app.get('/insert',  (req, res) => {
    // Create table in MySQL database (CREATE TABLE IF NOT EXISTS instructor?)
    const sql = `INSERT INTO instructor
                VALUES
                (1000, "Cave", "ComSci.", 65000),
                (2000, "Bonus", "ComEn.", 30000),
                (3000, "Atom", "IMSE", 35000),
                (4000, "August", "IT", 22000);`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Data inserted into table");
        res.send("Data inserted into table");
    });
});

app.get('/showdata', (req, res) => {
    const sql = 'SELECT * FROM instructor;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('shows', { data: result }); //จะไปหาใน folder views
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string (ข้อมูลจะอยู่ใน req)
    // const id = req.query.id; //ชื่อข้อมูลจะตาม name ใน <form>
    // const name = req.query.name;
    // const deptname = req.query.deptname;
    // const salary = req.query.salary;

    const { id, name, deptname, salary } = req.query;
    const insertSql = "INSERT INTO instructor (ID, name, dept_name, salary) VALUES (?, ?, ?, ?)";
    conn.query(insertSql,[id, name, deptname, salary], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});