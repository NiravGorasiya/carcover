const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/carcoverfactory")
    .then((res) => {
        console.log("success full database connected");
    })
    .catch((err) => {
        console.log(err, "err");
    })