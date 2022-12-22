const router = require("express").Router();
const { addCategory, getAllCatgory, delet_category, update_category, getBanner } = require("../controller/Category");
const upload = require("../middleware/uplode");
const cupload = upload.fields([{ name: "image", maxCount: 1 }, { name: "banner", maxCount: 1 }, { name: "cover_image", maxCount: 1 }])

router.post("/add", cupload, addCategory)
router.get("/all", getAllCatgory);
router.delete("/delet/:id", delet_category);
router.put('/update/:id', cupload, update_category)
router.get('/banner/:name', getBanner)

module.exports = router;