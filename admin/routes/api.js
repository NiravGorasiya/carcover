const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const path = require("path");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/admin');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg') {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            //cb(null, false);
            return cb(new Error('Only .gif, .png, .jpg and .jpeg format allowed!'));
        }
    } else if (ext === '.mp4' || ext === '.m1v' || ext === '.m4v' || ext === '.avi' || ext === '.mov') {
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg' || file.mimetype === 'video/x-m4v' || file.mimetype === 'video/x-msvideo' || file.mimetype === 'video/quicktime') {
            cb(null, true);
        } else {
            //cb(null, false);
            return cb(new Error('Only .mp4, .m1v, .m4v, .avi, .mov format allowed!'));
        }
    }
}

const upload = multer({fileFilter: fileFilter, storage: storage});


const articleMedia = []
for (let i = 0; i < 4; i++) {
    articleMedia.push({name: (`media${+i ? i : ''}`), maxCount: 1})
}

const router = express.Router();

const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");

const roleController = require("../controllers/roleController");
const travelPlansController = require("../controllers/travelplansController");
const profilesController = require("../controllers/profilesController");
const articlesController = require("../controllers/articlesController");

//_____________________________________ API for get user access role __________________________
router.route("/get/uac").post(catchErrors(adminController.uac));

//_______________________________ Admin management_______________________________

router.route("/admin/create").post(catchErrors(adminController.create));
router.route("/admin/read/:id").get(catchErrors(adminController.read));
router.route("/admin/update/:id").post(catchErrors(adminController.update));
router.route("/admin/delete/:id").delete(catchErrors(adminController.delete));
router.route("/admin/search").get(catchErrors(adminController.search));
router.route("/admin/list").get(catchErrors(adminController.list));

router
  .route("/admin/password-update/:id")
  .patch(catchErrors(adminController.updatePassword));
//list of admins ends here

//_____________________________________ API for clients __________________________
router.route("/post/create").post(upload.array('media', 5),catchErrors(postController.create));
router.route("/post/read/:id").get(catchErrors(postController.read));
router.route("/post/update/:id").post(upload.array('media', 5),catchErrors(postController.update));
router.route("/post/delete/:id").delete(catchErrors(postController.delete));
router.route("/post/search").get(catchErrors(postController.search));
router.route("/post/list").get(catchErrors(postController.list));

//_____________________________________ API for get tags __________________________
router.route("/get/tags").post(catchErrors(postController.getTags));

//_____________________________________ API for roles ___________________________
router.route("/role/create").post(catchErrors(roleController.create));
router.route("/role/read/:id").get(catchErrors(roleController.read));
router.route("/role/update/:id").post(catchErrors(roleController.update));
router.route("/role/delete/:id").delete(catchErrors(roleController.delete));
router.route("/role/search").get(catchErrors(roleController.search));
router.route("/role/list").get(catchErrors(roleController.list));

//_____________________________________ API for Travelplans ___________________________
router.route("/travelplans/create").post(catchErrors(travelPlansController.create));
router.route("/travelplans/read/:id").get(catchErrors(travelPlansController.read));
router.route("/travelplans/update/:id").post(catchErrors(travelPlansController.update));
router.route("/travelplans/delete/:id").delete(catchErrors(travelPlansController.delete));
router.route("/travelplans/search").get(catchErrors(travelPlansController.search));
router.route("/travelplans/list").get(catchErrors(travelPlansController.list));

//_____________________________________ API for articles ___________________________
router.route("/articles/create").post(upload.fields(articleMedia),catchErrors(articlesController.create));
router.route("/articles/read/:id").get(catchErrors(articlesController.read));
router.route("/articles/update/:id").post(upload.fields(articleMedia),catchErrors(articlesController.update));
router.route("/articles/delete/:id").delete(catchErrors(articlesController.delete));
router.route("/articles/search").get(catchErrors(articlesController.search));
router.route("/articles/list").get(catchErrors(articlesController.list));

//_____________________________________ API for profiles ___________________________
router.route("/profile/create").post(upload.fields([{name: 'profilePicture', maxCount: 1},{name: 'profileBanner', maxCount: 1}]),catchErrors(profilesController.create));
router.route("/profile/ban/:id").post(catchErrors(profilesController.banUser));
router.route("/profile/read/:id").get(catchErrors(profilesController.read));
router.route("/profile/update/:id").post(upload.fields([{name: 'profilePicture', maxCount: 1},{name: 'profileBanner', maxCount: 1}]),catchErrors(profilesController.update));
router.route("/profile/delete/:id").delete(catchErrors(profilesController.delete));
router.route("/profile/search").get(catchErrors(profilesController.search));
router.route("/profile/list").get(catchErrors(profilesController.list));

module.exports = router;
