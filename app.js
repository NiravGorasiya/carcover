require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const app = express()
const port = process.env.PORT

//Router
const catgory = require("./router/Category")
const make = require("./router/Make")
const body = require("./router/Body")
const model = require("./router/Model")
const vehicle = require("./router/Vehicle")
const Attribute = require("./router/Attribute")
const Banner = require("./router/Banner")

//database connection
require("./db/connection")

//test router
app.use(express.static(path.join(__dirname, 'public/uploads')))

//middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.use("/api/category", catgory)
app.use("/api/banner", Banner)
app.use("/api/make", make)
app.use("/api/body", body)
app.use("/api/model", model)
app.use("/api/vehicle", vehicle)
app.use("/api/attribute", Attribute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})