const express = require('express') //download Express framework
const app = express() //ตัวแทน webserver
const port = 3000

const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public')); //ระบุชื่อ folder

// app.get('/', function(req, res){ //GET (HTTP method), '/' -> path (home,root), ตามด้วย callback function
//     ⭐ ต้องสร้าง navigation เพื่อให้ผู้ใช้ไปตาม path ได้ (ผู้ใช้ไม่รู้ว่ามี path อะไรบ้าง) ⭐
//     let html = `<h1>Welcome to FWP </h1>
//                 <ul>
//                     <li><a href="/">Home</a></li>
//                     <li><a href="/hello">Hello</a></li>
//                 </ul>`;
//     res.send(html); //req สิ่งที่ผู้ใช้ request ex.ข้อมูลใน form, res สิ่งที่ response กลับไปยัง client
// });

// Without middleware
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

//ตอนแรกยังไป abount ไม่ได้ เพราะยังไม่ได้ get ตรงนี้ให้กับ app
app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/form', function(req, res){
    res.sendFile(path.join(__dirname, 'public/form.html'));
});

// Route handling query parameters
app.get('/submitform', (req, res) => {
    // Access query parameters using req.query
    // let fname = req.query.fname แบบนี้เสียเวลา
    const { fname, lname } = req.query; //ใช้วิธีนี้ ถ้าดึงผ่าน method get (ประกาศตัวแปรหลายตัว)
    res.send(`First name: ${fname}, Last name: ${lname}`); //template literal
});

app.listen(port, () => { //start server
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`);
})

//http://localhost:3000/hello (method get เรียกใช้ผ่าน path ตรง ๆ แบบนี้ได้เลย)
