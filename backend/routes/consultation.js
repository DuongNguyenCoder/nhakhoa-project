const router = require("express").Router();
const Joi = require("joi");
const ctrl = require("../controllers/consultationController");
const validateInfo = require("../middlewares/validateInfo");
const { verifyToken } = require("../middlewares/verifyToken");
const { string, stringReq, boolean } = require("../middlewares/joiSchema");
const { upload } = require("../configs/cloudinary");

router.post(
  "/create",
  // verifyToken,
  upload.none(),
  validateInfo(
    Joi.object({
      name: stringReq,
      phone: stringReq,
      isConfirm: boolean,
      message: string,
      note: string,
    }),
  ),
  ctrl.addConsultation,
);
router.put(
  "/update/:id",
  verifyToken,
  validateInfo(
    Joi.object({
      name: stringReq,
      phone: stringReq,
      isConfirm: boolean,
    }),
  ),
  ctrl.updateConsultation,
);
router.delete("/delete/:id", verifyToken, ctrl.deleteConsultation);
router.get("/:id", ctrl.getOne);
router.get("", ctrl.getAll);

module.exports = router;
