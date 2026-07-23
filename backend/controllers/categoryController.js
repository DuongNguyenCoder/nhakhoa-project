const Category = require("../models/category");

const addCategory = async (req, res) => {
  const alreadyCategory = await Category.exists({ title: req.body.title });
  if (Boolean(alreadyCategory)) throw new Error("loại sản phẩm đã tồn tại.");
  const response = await Category.create(req.body);
  return res.json({
    success: Boolean(response),
    mes: Boolean(response)
      ? "thêm thành công."
      : "xảy ra một lỗi vui lòng thử lại.",
  });
};
const updateCategory = async (req, res) => {
  console.log("ID PARAMS => ", req.params.id);
  const response = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json({
    success: Boolean(response),
    mes: Boolean(response) ? "sửa thành công." : "loại sản phẩm không tồn tại.",
  });
};
const deleteCategory = async (req, res) => {
  const response = await Category.findByIdAndDelete(req.params.id);
  return res.json({
    success: Boolean(response),
    mes: Boolean(response) ? "xóa thành công." : "loại sản phẩm không tồn tại.",
  });
};
const getAll = async (req, res) => {
  const { isNews } = req.query;
  const queries = {};

  if (isNews) queries.isNews = isNews;
  console.log(queries);
  const response = await Category.find(queries);
  return res.json({
    success: Boolean(response),
    mes: Boolean(response) ? "thành công." : "không có loại sản phẩm nào cả.",
    data: response,
  });
};

const getOne = async (req, res) => {
  const response = await Category.findOne({ slug: req.params.slug });
  return res.json({
    success: Boolean(response),
    message: Boolean(response) ? "thành công" : "Lấy category thất bại.",
    data: response,
  });
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getAll,
  getOne,
};
