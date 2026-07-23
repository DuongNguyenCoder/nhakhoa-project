const router = require("express").Router();
const ctrl = require("../controllers/directoryController");
const validateInfo = require("../middlewares/validateInfo");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { category, stringReq, file } = require("../middlewares/joiSchema");
const { upload } = require("../configs/cloudinary");
const Joi = require("joi");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  upload.single("directoryPic"),
  validateInfo(
    Joi.object({
      title: stringReq,
      slug: stringReq,
      category,
      directoryPic: file,
    }),
  ),
  ctrl.addDirectory,
);
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  upload.single("directoryPic"),
  validateInfo(
    Joi.object({
      title: stringReq,
      slug: stringReq,
      category,
      directoryPic: file,
    }),
  ),
  ctrl.updateDirectory,
);
router.delete("/delete/:id", verifyToken, isAdmin, ctrl.deleteDirectory);

router.get("", ctrl.getAll);

router.get("/:slug", ctrl.getOne);

module.exports = router;
