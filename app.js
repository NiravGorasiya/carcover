require('dotenv').config()
require("./db/connection")
const express = require('express')
const logger = require("morgan")
const cors = require("cors")
const path = require("path")
const sessions = require("express-session")
const cookieParser = require("cookie-parser")
const app = express()
const port = process.env.PORT

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(cookieParser())
//Router
require('./seeder/admin')
const router = require('./router/index');

const oneDay = 1000 * 60 * 60 * 48;
app.use(sessions({
    secret: 'jay',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true
}));

app.use(router);




var sess;

app.get('/', (req, res) => {
    sess = req.session;
    if (sess.sessionId) {
        console.log(req.cookies.node_session);
    }
    res.send(req.cookies)
});


app.post('/login', async (req, res) => {
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
    res.clearCookie("node_session")
    res.send("all clear cookie")
})

app.get("/getCookie", (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



