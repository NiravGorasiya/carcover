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

require('./seeder/admin')
const router = require('./router/index');
app.use(router);



app.get('/', async (req, res) => {
    res.cookie("coupon", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRUVk9ETSIsImlhdCI6MTY3MjI5MjEzNX0.telMPbfyFqBG0za6HJYOyhjPhKPcXLmi_h0lkD2KIVY"),
        res.cookie("node_session", "4d06002d-8ffd-411c-b262-e6b5e554c786"),
        res.cookie("order_id", "63ad3e8da9f1064f87002753"),
        res.cookie("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjcyMjkyMTc2fQ.5-ftrrdGr5LrAvEUAqXRF0fBvhX1rlUqxDP9W-Tx4lo");
    return res.send(req.cookies)
}
);

app.get("/deleteCooike", (req, res, next) => {
    res.clearCookie("")
    res.send("all clear cookie")
})

app.get("/getCookie", (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
