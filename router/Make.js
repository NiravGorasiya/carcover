const router = require("express").Router();
const { makeAdd, getAllMake } = require("../controller/Make")

router.post("/add", makeAdd)
router.get("/all", getAllMake)

module.exports = router;