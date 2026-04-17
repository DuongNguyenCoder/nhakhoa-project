const router = require("express").Router();
const ctrl = require("../controllers/newController");
const Joi = require("joi");
const validateInfo = require("../middlewares/validateInfo");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { stringReq, file, string } = require("../middlewares/joiSchema");
const { upload } = require("../configs/cloudinary");

router.post(
  "/add-new",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "newPic", maxCount: 1 },
    { name: "pdfUrl", maxCount: 1 },
  ]),
  validateInfo(
    Joi.object({
      title: stringReq,
      description: string,
      status: stringReq,
      category: string,
      newPic: file,
      pdfUrl: file,
    })
  ),
  ctrl.addNew
);
router.put(
  "/update-new/:id",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "newPic", maxCount: 1 },
    { name: "pdfUrl", maxCount: 1 },
  ]),
  validateInfo(
    Joi.object({
      title: stringReq,
      description: string,
      status: stringReq,
      category: string,
      newPic: file,
      pdfUrl: file,
    })
  ),
  ctrl.updateNew
);
router.delete(
  "/delete-new/:id",
  verifyToken,
  isAdmin,

  ctrl.deleteNew
);
router.get("", ctrl.getAll);

module.exports = router;
