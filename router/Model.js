const router = require("express").Router();
const { modelAdd, getAllmodel, Model_delete, Model_update } = require("../controller/Model")

router.post("/add", modelAdd)
router.get("/all", getAllmodel)
router.delete("/delete/:id",Model_delete)
router.put("/update/:id",Model_update)
module.exports = router;