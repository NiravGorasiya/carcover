require('dotenv').config()
require("./db/connection")
const express = require('express')
const logger = require("morgan")
const path = require("path")
const cookieParser = require("cookie-parser")

var app = express()
const port = process.env.PORT
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(cookieParser())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5500`');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS ');
    next();
});

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/deleteCooike", (req, res, next) => {
    res.clearCookie("")
    res.send("all clear cookie")
})

app.get("/getCookie", (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies)
})

require('./seeder/admin')
const router = require('./router/index');
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

