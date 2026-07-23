const router = require("express").Router();
const ctrl = require("../controllers/newController");
const Joi = require("joi");
const validateInfo = require("../middlewares/validateInfo");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const {
  stringReq,
  file,
  string,
  boolean,
} = require("../middlewares/joiSchema");
const { upload } = require("../configs/cloudinary");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "newPic", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  validateInfo(
    Joi.object({
      title: stringReq,
      slug: stringReq,
      overview: string,
      description: string,
      isActive: boolean,
      featured: boolean,
      category: Joi.string().optional(),
      newPic: file,
      hasPdf: boolean,
      pdfFile: Joi.any().optional(),
    }),
  ),
  ctrl.addNew,
);
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "newPic", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  validateInfo(
    Joi.object({
      title: stringReq,
      slug: stringReq,
      overview: string,
      description: string,
      isActive: boolean,
      featured: boolean,
      category: Joi.string().optional(),
      newPic: file,
      hasPdf: boolean,
      pdfFile: Joi.any().optional(),
    }),
  ),
  ctrl.updateNew,
);
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,

  ctrl.deleteNew,
);
router.get("", ctrl.getAll);
router.get("/:slug", ctrl.getBySlug);

module.exports = router;
