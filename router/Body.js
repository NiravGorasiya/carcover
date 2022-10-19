const router = require("express").Router()
const { bodyAdd, getAllBody } = require("../controller/Body")

router.post("/add", bodyAdd)
router.get("/all", getAllBody)

module.exports = router