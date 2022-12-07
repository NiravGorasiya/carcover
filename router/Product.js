const router = require("express").Router();
const { addProduct, getallProduct, delete_product, update_product, product_find } = require("../controller/ProductController");
const { products } = require("../controller/vehicle");

router.post("/add", addProduct)
router.get("/all", getallProduct)
router.get("/:category", product_find)
router.delete("/delete/:id", delete_product)
router.put("/update/:id", update_product)
// router.post("/get/:category/:year/:make/:model/:body", products)
module.exports = router