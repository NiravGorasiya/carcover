const { country_all, state_all, city_all } = require("../controller/helper")

const router = require("express").Router()

router.get("/country", country_all)
router.get("/state", state_all)
router.get("/city", city_all)

module.exports = router