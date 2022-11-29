const { adduser, loginuser, changePassword, all_user,  } = require("../controller/user");
const { auth } = require("../middleware/auth");


const router = require("express").Router();

router.post('/register', adduser);
router.post("/login", loginuser);
router.post("/changepassword", auth, changePassword);
router.get("/all", all_user);

module.exports = router

