const router = require("express").Router();
const { addAttribute, getAllAttribute, deleteAttribute, update_attribute } = require("../controller/AttributeController");

router.post("/add", addAttribute)
router.get("/all", getAllAttribute)
router.delete("/delete/:id", deleteAttribute)
router.put('/update/:id',update_attribute)
module.exports = router;