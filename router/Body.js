const router = require("express").Router()
const { bodyAdd, getAllBody, Body_delete, Body_update } = require("../controller/Body")

router.post("/add", bodyAdd)
router.get("/all", getAllBody)
router.delete("/delete/:id", Body_delete)
router.put("/update/:id", Body_update)
module.exports = router