const Consultation = require("../models/consultation");
const appendConsultation = require("../utils/append-consultation");

const addConsultation = async (req, res) => {
  const payload = req.body;
  const response = await Consultation.create(payload);

  try {
    await appendConsultation(payload);
  } catch (error) {
    console.error("Google Sheet sync failed:", error);
  }

  return res.json({
    success: Boolean(response),
    message: Boolean(response) ? "Đăng ký thành công" : "Đăng ký thất bại",
  });
};
const updateConsultation = async (req, res) => {
  const response = await Consultation.findByIdAndUpdate(
    req.params.id,
    req.body,
  );
  return res.json({
    success: Boolean(response),
    message: Boolean(response)
      ? "sửa thành công"
      : "sửa thất bại vui lòng thử lại",
  });
};
const deleteConsultation = async (req, res) => {
  const response = await Consultation.findByIdAndDelete(req.params.id);
  return res.json({
    success: Boolean(response),
    message: Boolean(response)
      ? "xóa thành công"
      : "xóa thất bại vui lòng thử lại",
  });
};
const getOne = async (req, res) => {
  const response = await Consultation.findById(req.params.id);
  return res.json({
    success: Boolean(response),
    message: Boolean(response) ? "thành công" : "thất bại vui lòng thử lại",
    data: response,
  });
};

const getAll = async (req, res) => {
  const {
    limit = 10,
    page = 1,
    sort = "-createdAt",
    name,
    mobile,
    isConfirm,
  } = req.query;
  const queries = {};

  if (name) queries.name = name;
  if (mobile) queries.mobile = mobile;
  if (isConfirm) queries.isConfirm = isConfirm;

  const total = await Consultation.countDocuments(queries);

  const orders = await Consultation.find(queries)
    .skip(Math.max(page - 1, 0) * limit)
    .limit(limit)
    .sort(sort);

  return res.json({
    success: true,
    message: orders.length
      ? "Lấy đơn hàng thành công"
      : "Không tìm thấy đơn hàng",
    data: orders,
    total: total,
  });
};

module.exports = {
  addConsultation,
  updateConsultation,
  deleteConsultation,
  getOne,
  getAll,
};
