const router = require("express").Router();
const { vehicleAdd, getAllvehicle, vehicleDelete, getAllMake, getAllModel, getAllBody, vehicleUpdate } = require("../controller/vehicle")

router.post("/add", vehicleAdd)
router.get("/:category", getAllvehicle)
router.post("/all/make", getAllMake)
router.post("/all/model", getAllModel)
router.post("/all/body", getAllBody)
router.put("/edit/:id", vehicleUpdate)
router.delete("/delete/:id", vehicleDelete)

module.exports = router;