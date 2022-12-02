const router = require("express").Router();
const { makeAdd, getAllMake, make_delete, make_update } = require("../controller/Make")

router.post("/add", makeAdd)
router.get("/all", getAllMake)
router.delete("/delete/:id", make_delete)
router.put("/update/:id", make_update)
module.exports = router;