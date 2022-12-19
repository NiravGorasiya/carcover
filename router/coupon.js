const { coupon_add, coupon_delete, coupon_update, coupon_getone, coupon_all } = require('../controller/coupon')

const router = require('express').Router()

router.post('/add', coupon_add);
router.delete('/delete/:id', coupon_delete)
router.put('/update/:id', coupon_update)
router.post('/get', coupon_getone)
router.get('/all', coupon_all)



module.exports = router