require('dotenv').config()
require("./db/connection")
const express = require('express')
const logger = require("morgan")
const path = require("path")
const sessions = require("express-session")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const app = express()
const port = process.env.PORT


app.use(logger('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(cookieParser())


// const oneDay = 1000 * 60 * 60 * 48;
// cookie: { maxAge: oneDay },
app.use(sessions({
    secret: 'jay',
    saveUninitialized: true,
    resave: true
}));


//Router
require('./seeder/admin')
const router = require('./router/index');
const { log } = require('console')
app.use(router);

var sess;
app.get('/', (req, res) => {
    sess = req.session;
    if (sess.sessionId) {
        console.log(req.cookies.node_session);
    }
    res.send(req.cookies)
});


app.get('/login', async (req, res) => {
    sess = req.session;
    const hash = await bcrypt.hash(uuidv4(), 10)
    sess.sessionId = hash;
    if (req.cookies.node_session) {
        console.log("yes");
        res.send(req.cookies.node_session)
    } else {
        console.log("no");
        res.cookie('node_session', sess.sessionId)
    }
});

app.get("/setCookie", (req, res) => {
    res.cookie('Coiken umang', "cookie value")
    res.send("cookie save successfull")
})

app.get("/deleteCooike", (req, res, next) => {
    res.clearCookie("coupon")
    res.send("all clear cookie")
})

app.get("/DeliveryDate", (req, res) => {

})

app.get("/getCookie", (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
