const { v2 } = require("cloudinary");
const New = require("../models/new");

const addNew = async (req, res) => {
  const newPicFile = req.files?.newPic?.[0];
  const pdfFile = req.files?.pdfUrl?.[0];

  if (!newPicFile) {
    return res.status(400).json({
      success: false,
      mes: "Ảnh đại diện là bắt buộc.",
    });
  }

  const newRecord = await New.create({
    ...req.body,
    newPic: newPicFile.path,
    ...(pdfFile ? { pdfUrl: pdfFile.path } : {}),
  });

  const uploadResponse = await v2.uploader.upload(newPicFile.path, {
    public_id: `new_${newRecord._id}`,
    overwrite: true,
    folder: "app/new",
  });

  const updateData = {
    newPic: uploadResponse.secure_url,
  };

  if (pdfFile) {
    const uploadPdf = await v2.uploader.upload(pdfFile.path, {
      public_id: `pdf_${newRecord._id}`,
      overwrite: true,
      folder: "app/pdf",
    });
    updateData.pdfUrl = uploadPdf.secure_url;
  }

  const updatedRecord = await New.findByIdAndUpdate(newRecord._id, updateData, {
    new: true,
  });

  return res.json({
    success: Boolean(updatedRecord),
    mes: Boolean(updatedRecord)
      ? "thêm thành công."
      : "xảy ra một lỗi vui lòng thử lại.",
  });
};

const updateNew = async (req, res) => {
  const newPicFile = req.files?.newPic?.[0];
  const pdfFile = req.files?.pdfUrl?.[0];

  if (!newPicFile) {
    return res.status(400).json({
      success: false,
      mes: "Ảnh đại diện là bắt buộc.",
    });
  }

  const uploadResponse = await v2.uploader.upload(newPicFile.path, {
    public_id: `new_${req.params.id}`,
    overwrite: true,
    folder: "app/new",
  });

  const updateData = {
    ...req.body,
    newPic: uploadResponse.secure_url,
  };

  if (pdfFile) {
    const uploadPdf = await v2.uploader.upload(pdfFile.path, {
      public_id: `pdf_${req.params.id}`,
      overwrite: true,
      folder: "app/pdf",
    });
    updateData.pdfUrl = uploadPdf.secure_url;
  }

  const response = await New.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  return res.json({
    success: Boolean(response),
    mes: Boolean(response) ? "sửa thành công." : "loại tin tức không tồn tại.",
  });
};
const deleteNew = async (req, res) => {
  const response = await New.findByIdAndDelete(req.params.id);
  return res.json({
    success: Boolean(response),
    mes: Boolean(response) ? "xóa thành công." : "loại tin tức không tồn tại.",
  });
};
const getAll = async (req, res) => {
  const {
    page = 1,
    sort = "-createdAt",
    limit = 10,
    title,
    category,
    search,
    description,
    status,
  } = req.query;
  const queries = {};
  if (title) queries.title = { $regex: new RegExp(title, "i") };
  if (status) queries.status = status;
  if (category) queries.category = { $regex: new RegExp(category, "i") };
  if (description)
    queries.description = { $regex: new RegExp(description, "i") };
  if (search) {
    queries.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
      { category: { $regex: new RegExp(search, "i") } },
    ];
  }

  const total = await New.countDocuments(queries);
  const totalPages = Math.ceil(total / limit);
  const news = await New.find()
    .skip(Math.round(Math.max(page - 1, 0)) * limit)
    .limit(limit)
    .sort(sort);

  return res.json({
    success: Boolean(news),
    mes: Boolean(news) ? "thành công." : "không có loại tin tức nào cả.",
    data: news,
    pagination: {
      page: +page,
      limit: +limit,
      total,
      totalPages,
    },
  });
};

const getBySlug = async (req, res) => {
  const response = await New.findOne({ slug: req.params.slug });
  return res.json({
    success: Boolean(response),
    message: Boolean(response)
      ? "Get post detail successfully"
      : "Get post detail failed.",
    data: response,
  });
};

module.exports = { addNew, updateNew, deleteNew, getAll, getBySlug };
