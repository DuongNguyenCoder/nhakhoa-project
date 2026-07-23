const router = require("express").Router();
const Joi = require("joi");
const ctrl = require("../controllers/categoryController");
const validateInfo = require("../middlewares/validateInfo");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { stringReq, boolean } = require("../middlewares/joiSchema");

router.post(
  "/create",
  verifyToken,
  isAdmin,
  validateInfo(
    Joi.object({
      title: stringReq,
      isNews: boolean,
      slug: stringReq,
    }),
  ),
  ctrl.addCategory,
);
router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  validateInfo(
    Joi.object({
      title: stringReq,
      isNews: boolean,
      slug: stringReq,
    }),
  ),
  ctrl.updateCategory,
);
router.delete("/delete/:id", verifyToken, isAdmin, ctrl.deleteCategory);
router.get("", ctrl.getAll);
router.get("/:slug", ctrl.getOne);

module.exports = router;
