const Method = require("../models/method");

const addMethod = async (req, res) => {
  const newMethod = await Method.create(req.body);
  return res.json({
    success: Boolean(newMethod) ? true : false,
    mes: Boolean(newMethod)
      ? "thêm thành công phương thức."
      : "thêm thất bại phương thức. Vui lòng thử lại",
  });
};

const updateMethod = async (req, res) => {
  const editMethod = await Method.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json({
    success: Boolean(editMethod) ? true : false,
    mes: Boolean(editMethod)
      ? "sửa thành công phương thức."
      : "phương thức không tồn tại vui lòng kiểm tra lại.",
  });
};

const deleteMethod = async (req, res) => {
  const editMethod = await Method.findByIdAndDelete(req.params.id);
  return res.json({
    success: Boolean(editMethod) ? true : false,
    mes: Boolean(editMethod)
      ? "xóa thành công phương thức."
      : "phương thức không tồn tại vui lòng kiểm tra lại.",
  });
};

const getMethod = async (req, res) => {
  const method = await Method.findById(req.params.id);
  return res.json({
    success: Boolean(method) ? true : false,
    mes: Boolean(method) ? "thành công." : "không có phương thức nào.",
    data: method,
  });
};

const getMethods = async (req, res) => {
  const { title, page = 1, sort = "-createdAt", limit = 10 } = req.query;
  const queries = {};

  if (title) queries.title = { $regex: new RegExp(title, "i") };

  const total = await Method.countDocuments(queries);
  const totalPages = Math.ceil(total / limit);
  const methods = await Method.find(queries)
    .skip(Math.round(Math.max(page - 1, 0)) * limit)
    .limit(limit)
    .sort(sort);

  return res.json({
    success: Boolean(methods) ? true : false,
    mes: Boolean(methods) ? "thành công." : "không có phương thức nào.",
    data: methods,
    pagination: {
      page: +page,
      limit: +limit,
      total,
      totalPages,
    },
  });
};

module.exports = {
  addMethod,
  updateMethod,
  deleteMethod,
  getMethod,
  getMethods,
};
