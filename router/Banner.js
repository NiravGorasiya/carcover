const router = require("express").Router();
const { addBanner, getSingleBanner } = require("../controller/BannerController");
const upload = require("../middleware/uplode");

router.post("/add", upload.single("image"), addBanner)
router.get("/:category", getSingleBanner)

module.exports = router;