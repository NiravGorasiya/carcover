const router = require("express").Router();
const { attribute_add, attribute_all, attribute_delete, attribut_update } = require("../controller/AttributeController");

router.post("/add", attribute_add)
router.get("/all", attribute_all)
router.delete("/delete/:id", attribute_delete)
router.put('/update/:id', attribut_update)
module.exports = router;