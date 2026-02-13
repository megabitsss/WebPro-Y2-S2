const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employees copy.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', function (req, res) {
    res.render("home");
})

app.get('/create', function (req, res) {
    const sql  = ` CREATE TABLE employees (
        EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        LastName NVARCHAR(20)  NOT NULL,
        FirstName NVARCHAR(20)  NOT NULL,
        Title NVARCHAR(30),
        Phone NVARCHAR(24),
        Email NVARCHAR(60) ); `;

    db.run(sql, (err) => { //.run ไม่ต้องการผลลัพธ์ในการ respond ex. INSERT
        if (err) {
            return console.error('Error creating table:', err.message);
        }
        console.log('Table created successful');
    });
})

app.get('/show', function (req, res) {
  const query = 'SELECT * FROM employees;';
  db.all(query, (err, rows) => { //.all ต้องการผลลัพธ์กลับมาด้วย, ข้อมูลอยู่ใน rows
    if (err) {
        console.log(err.message);
    }
        console.log(rows);
        res.render('show', { data : rows });
    });
});

app.get('/delete/:id', function (req, res) { //ส่งมาเป็น /delete/EMPLOYEEID
    // Deleting Data
    //ส่งมาผ่าน METHOD GET จะอยู่ใน req, เอาจาก params.id
    let sql = `DELETE FROM employees
                WHERE EmployeeId=${req.params.id}`;
    // delete a row based on id
    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been deleted`);
        res.redirect('/show');
    });
})

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/html/form.html"));
});

app.get('/formget', function (req, res) {
    // let formdata = { วิธีนี้พิมพ์เยอะ
    //     id: req.query.id,
    //     fname: req.query.fname,
    //     // ...
    // };
    const { id, fname, lname, title, phone, email } = req.query;
    let sql = `INSERT INTO employees(EmployeeId, FirstName, LastName, Title, Phone, Email) VALUES(?, ?, ?, ?, ?, ?);`; //bind ข้อมูลไว้ก่อน
    console.log(sql);
    db.run(sql, [ id, fname, lname, title, phone, email ], (err) => {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log('Data inserted successful');
    });
})

// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});