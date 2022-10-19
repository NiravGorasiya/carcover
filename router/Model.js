const router = require("express").Router();
const { modelAdd, getAllmodel } = require("../controller/Model")

router.post("/add", modelAdd)
router.get("/all", getAllmodel)

module.exports = router;