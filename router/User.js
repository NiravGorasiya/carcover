const User = require("../Models/User");

const router = require("express").Router();

router.post("/register", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const result = await user.save();
        return res.status(201).json(result)
    } catch (error) {
        console.log(error, "error");
    }
})

router.get("/all", async (req, res, next) => {
    try {
        const user = await User.find();
        return res.status(200).json(user)
    } catch (error) {

    }
})
module.exports = router

