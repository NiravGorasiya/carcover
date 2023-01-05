require('dotenv').config()
require("./db/connection")
const express = require('express')
const logger = require("morgan")
const path = require("path")
const cookieParser = require("cookie-parser")
const paypal = require('paypal-rest-sdk');
var app = express()
const port = process.env.PORT
const cors = require("cors")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(cookieParser())

paypal.configure({
    'mode': 'sandbox', //sandbox or live1
    'client_id': 'AZ4dpb10mDNHior641h-VUBQk1_S6-n92y2HcO4VYBDpgBZ6KpGq9DRN0J5qg0oq8V9bomPBTT182nfS',
    'client_secret': 'EEbCZhXhzR1sVqkfv5hwO6uqOpOmr4kVfx65_aa08uQelOe4KfwK7WKoSpGsTyywRjpPgGpdXFoQq8pG'
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));
require('./seeder/admin')
const router = require('./router/index');
app.use(router);
app.get("/deleteCooike", (req, res, next) => {
    res.clearCookie("")
    res.send("all clear cookie")
})
app.get("/getCookie", (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies)
})


const PORT = process.env.PORT;
app.listen(PORT, process.env.HOSTNAME, () => {
    console.log(`Server running at http://${process.env.HOSTNAME}:${PORT}`)
});
