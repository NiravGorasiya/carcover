const router = require("express").Router();
const { addAttribute, getAllAttribute, deleteAttribute } = require("../controller/AttributeController");

router.post("/add", addAttribute)
router.get("/all", getAllAttribute)
router.delete("/delete/:id", deleteAttribute)

module.exports = router;