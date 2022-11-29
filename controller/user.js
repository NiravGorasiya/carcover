'use strict'

const Users = require('../Models/User');
var validator = require("email-validator");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adduser = async (req, res) => {
    try {
        let { email, password, confirm_password, firstname, lastname } = req.body;
        if (!email || !password || !confirm_password || !firstname || !lastname) {
            return res.status(400).json({ status: false, message: "all fild requiard !" });
        }
        if (!(password === confirm_password)) {
            return res.status(400).json({ status: false, message: "password and confimpassword not match !" });
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {
            return res.status(400).send({ status: false, message: "Email is not valid !" })
        }
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({ status: false, message: "7 to 15 characters which contain at least one numeric digit and a special character" })
        }
        const email_find = await Users.findOne({ email: req.body.email });
        if (email_find) {
            return res.status(400).json({ status: false, message: "Email is allrediy exist !" })
        }
        const hash = bcrypt.hashSync(password, 10);
        let add = new Users({
            firstname,
            lastname,
            fullname: `${firstname + ' ' + lastname}`,
            email,
            password: hash
        });
        const ad = await add.save();
        return res.status(201).json({ status: true, result: ad, message: "user register success fully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Email or password missing." })
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {
            return res.status(400).json({ status: false, message: "Email is not valid." })
        }
        const login = await Users.findOne({ email: email })
        if (!login) {
            return res.status(400).json({ status: false, message: "User does not exist " });
        }
        const valid_password = bcrypt.compareSync(password, login.password);
        if (!valid_password) {
            return res.status(400).json({ status: false, message: "Invalid Email And Password" });
        }
        const token = await jwt.sign({ id: login.id }, process.env.SECRETKEY);
        return res.status(200).json({ status: true, token, result: login });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const all_user = async (req, res) => {
    try {
        let all = await Users.find();
        res.status(200).json({ status: true, result: all });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const changePassword = async (req, res) => {
    let id = req.user.id;
    try {
        const get = await Users.findById(id);
        if (get) {
            let { old_password, password, confirm_password } = req.body
            const valid_password = bcrypt.compare(old_password, get.password);
            if (!valid_password) { return res.status(400).json({ status: false, error: "not match old password" }); }
            let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (!password.match(passwordcheck)||!confirm_password.match(passwordcheck)) { return res.status(400).json({ status: false, message: "7 to 15 characters which contain at least one numeric digit and a special character" }) }
            if (!(password === confirm_password)) { return res.status(400).json({ status: false, error: "not match Password and confirm_password" }); }
            const hash = bcrypt.hashSync(password, 10);
            get.password = hash;
            get.save();
            return res.status(200).json({ status: true, result: get });
        } else {
            return res.status(400).json({ status: false, error: "User does not login !" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




module.exports = { adduser, loginuser, all_user, changePassword}






