const { v2 } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req, file) => {
    if (file.fieldname === "pdfFile") {
      return {
        folder: "app/pdf",
        resource_type: "raw",
        format: "pdf",
      };
    }

    return {
      folder: "app/image",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

module.exports = { upload, v2 };
