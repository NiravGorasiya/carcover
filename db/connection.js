const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/carcoverfactory")
    .then((res) => {
        console.log("success full database connected");
    })
    .catch((err) => {
        console.log(err, "err");
    })