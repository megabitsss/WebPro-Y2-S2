const express = require('express') //download Express framework
const app = express() //ตัวแทน webserver
const port = 3000

const path = require('path');
// Serve static files from multiple directories
app.use(express.static('public')); //ระบุชื่อ folder

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/guitar', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/guitar.html'));
});

app.get('/bass', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/bass.html'));
});

app.get('/effect', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/effect.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.listen(port, () => { //start server
    console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`);
})