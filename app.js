require('dotenv').config()
require("./db/connection")
const express = require('express')
const logger = require("morgan")
const cors = require("cors")
const path = require("path")
const app = express()
const port = process.env.PORT

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/uploads')));
//Router
require('./seeder/admin')
const router = require('./router/index');
app.use(router);

app.get("/", (req, res) => {
    return res.send("sfhgj")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

