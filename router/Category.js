const router = require("express").Router();
const { addCategory, getAllCatgory, delet_category, update_category } = require("../controller/Category");
const upload = require("../middleware/uplode");

router.post("/add", upload.single("image"), addCategory)
router.get("/all", getAllCatgory);
router.delete("/delet/:id",delet_category);
router.put('/update/:id',upload.single("image"),update_category)

module.exports = router;