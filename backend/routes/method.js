const ctrl = require("../controllers/methodController");
const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { stringReq } = require("../middlewares/joiSchema");
const validateInfo = require("../middlewares/validateInfo");
const Joi = require("joi");

router.post(
  "/add-method",
  validateInfo(
    Joi.object({
      title: stringReq,
      description: stringReq,
    })
  ),
  verifyToken,
  isAdmin,
  ctrl.addMethod
);

router.put(
  "/update-method/:id",
  validateInfo(
    Joi.object({
      title: stringReq,
      description: stringReq,
    })
  ),
  verifyToken,
  isAdmin,
  ctrl.updateMethod
);

router.delete("/delete-method/:id", verifyToken, isAdmin, ctrl.deleteMethod);

router.get("/:id", verifyToken, isAdmin, ctrl.getMethod);

router.get("/", ctrl.getMethods);

module.exports = router;
