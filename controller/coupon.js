'use strict'
const Coupon = require("../Models/Coupon");
const otpGenerator = require('otp-generator');
const { changeDateFormatTo } = require("./helper");

const coupon_add = async (req, res) => {
    try {
        const { discount, type, max_price, max_use, end_date, start_date } = req.body
        console.log(req.body.discount);
        if (!discount) {
            return res.status(404).json({ status: false, messge: "enter the discount" });
        }
        const token = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false });
        const add = await Coupon.create({
            coupon_code: token,
            discount,
            type,
            max_price,
            max_use,
            start_date,
            end_date
        })
        return res.status(201).json({ status: true, result: add })
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

const coupon_delete = async (req, res) => {
    try {
        const a = await Coupon.findById({ _id: req.params.id })
        if (!a) {
            return res.status(404).json({ status: false, messge: "coupon not find" })
        }
        await a.delete();
        return res.status(404).json({ status: true, messge: "coupon delete succesfully" })
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

const coupon_update = async (req, res) => {
    try {
        const { discount, type, max_price, max_use, end_date, start_date } = req.body
        const data = await Coupon.findByIdAndUpdate({ _id: req.params.id }, {
            discount: discount,
            type: type,
            max_price: max_price,
            max_use: max_use,
            start_date: start_date,
            end_date: end_date
        }, {
            new: true
        })
        return res.status(200).json({ status: true, messge: "coupon update succesfully", result: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })

    }
}

const coupon_getone = async (req, res) => {
    try {
        var sess;
        const coupon = await Coupon.findOne({ coupon_code: req.body.coupon_code })
        if (!coupon) {
            return res.status(400).json({ messge: "plase enter valit coupon code" })
        }
        var x = new Date(new Date().setDate(new Date().getDate()))
        if (changeDateFormatTo(x) > coupon.end_date || coupon.coupon_use >= coupon.max_use) {
            return res.status(400).json({ status: false, messge: "coupon is expir" });
        }
        sess = req.session;
        sess.sessionId = coupon.id;
        var id = sess.sessionId
        res.cookie('coupon', id)
        return res.status(200).json({ status: true, result: "coupon verify successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })
    }
}

const coupon_all = async (req, res) => {
    try {
        const data = await Coupon.find()
        return res.status(200).json({ status: true, result: data })
    } catch (error) {
        return res.status(500).json({ error: error.messge })
    }
}

module.exports = { coupon_add, coupon_delete, coupon_update, coupon_getone, coupon_all }

