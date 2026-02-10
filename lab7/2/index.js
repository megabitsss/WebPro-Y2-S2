const express = require('express') //download Express framework
const app = express() //ตัวแทน webserver
const port = 3000

const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public')); //⭐ระบุชื่อ folder ทำให้เว็บคือ / (root) -> ไม่ต้องเริ่มจาก public แล้ว

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/padthai', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/html/padthai.html'));
});

app.get('/burger', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/html/burger.html'));
});

app.get('/pizza', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/html/pizza.html'));
});

app.get('/sushi', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/html/sushi.html'));
});

app.get('/bibimbab', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/html/bibimbab.html'));
});

app.get('/taco', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/html/taco.html'));
});

app.listen(port, () => { //start server
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`);
})