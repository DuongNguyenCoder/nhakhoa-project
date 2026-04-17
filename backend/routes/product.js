const Joi = require('joi')
const validateInfo = require('../middlewares/validateInfo')
const { verifyToken, isAdmin } = require('../middlewares/verifyToken')
const { stringReq, numberReq, boolean, files } = require('../middlewares/joiSchema')
const { upload } = require('../configs/cloudinary')
const router = require('express').Router()
const ctrl = require('../controllers/productController')
const { v2 } = require('../configs/cloudinary')

router.post(
  '/add-product',
  verifyToken,
  isAdmin,
  upload.fields([
    {
      name: 'productPics',
      maxCount: 5,
    },
  ]),
  validateInfo(
    Joi.object({
      productPics: files,
      title: stringReq,
      description: stringReq,
      originalPrice: numberReq,
      salePrice: numberReq,
      quantity: numberReq,
      isLiquidation: boolean,
      directory: stringReq,
      isFeatured: boolean,
      brand: stringReq,
      origin: stringReq,
      introduce: stringReq,
    }),
  ),
  ctrl.addProductByAdmin,
)

router.put(
  '/update-product/:id',
  verifyToken,
  isAdmin,
  upload.fields([
    {
      name: 'productPics',
      maxCount: 5,
    },
  ]),
  validateInfo(
    Joi.object({
      productPics: files,
      title: stringReq,
      description: stringReq,
      category: Joi.string().optional(),
      originalPrice: numberReq,
      salePrice: numberReq,
      quantity: numberReq,
      isLiquidation: boolean,
      directory: stringReq,
      isFeatured: boolean,
      brand: stringReq,
      origin: stringReq,
      introduce: stringReq,
    }),
  ),
  ctrl.updateProductByAdmin,
)

router.put(
  '/upload-description-pic',
  verifyToken,
  isAdmin,
  upload.single('descriptionPic'),
  (req, res) => {
    if (!req.file || !req.file.path) {
      console.log('File không tồn tại!')
      return res.status(400).json({ success: false, message: 'Không có ảnh được upload!' })
    }

    v2.uploader
      .upload(req.file.path, { folder: 'app/products/description' })
      .then(result => {
        return res.status(200).json({
          success: true,
          url: result.secure_url, // trả về URL cloudinary cho frontend
        })
      })
      .catch(error => {
        console.error('Lỗi upload descriptionPic:', error)
        return res.status(500).json({ success: false, message: 'Upload thất bại!' })
      })
  },
)

router.delete('/delete-product/:id', verifyToken, isAdmin, ctrl.deleteProductByAdmin)
router.get('/insert-data', ctrl.insertData)
router.get('', ctrl.getAll)
router.get('/:id', ctrl.getOne)
module.exports = router
