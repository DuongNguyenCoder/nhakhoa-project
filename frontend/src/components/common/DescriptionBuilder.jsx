import { useEffect, useState } from "react";
import { apiUploadDescriptionPic } from "@/apis/ProductAPI";

const DescriptionBuilder = ({ value, onChange }) => {
  const [mainHeader, setMainHeader] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && value && Object.keys(value).length > 0) {
      setMainHeader(typeof value.mainHeader === "string" ? value.mainHeader : "");
      setBlocks(Array.isArray(value.blocks) ? value.blocks : []);
      setInitialized(true);
    }
  }, [value, initialized]);

  const addBlock = (type) => {
    const newBlock = { type, header: "", content: "" };
    if (type === "imageText") newBlock.layout = "left";
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (index, newBlock) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? newBlock : b)));
  };

  const removeBlock = (index) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (index, file) => {
    try {
      const formData = new FormData();
      formData.append("descriptionPic", file);
      const res = await apiUploadDescriptionPic(formData);
      if (res.data.success && res.data.url) {
        updateBlock(index, { ...blocks[index], image: res.data.url });
      } else {
        alert("Upload ảnh thất bại!");
      }
    } catch (error) {
      console.error("Lỗi upload ảnh block:", error);
      alert("Upload ảnh thất bại!");
    }
  };

  useEffect(() => {
    const cleanBlocks = blocks.map(({ file, ...rest }) => rest);
    onChange({ mainHeader, blocks: cleanBlocks });
  }, [mainHeader, blocks, onChange]);

  return (
    <div className="space-y-6 rounded-xl border bg-gray-50 p-6 shadow-inner">
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">🎨 Tiêu đề chính</label>
        <input
          type="text"
          value={mainHeader}
          onChange={(e) => setMainHeader(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          placeholder="Nhập tiêu đề chính..."
        />
      </div>

      {blocks.map((block, idx) => (
        <div
          key={idx}
          className="relative rounded-2xl border border-gray-300 bg-white p-6 shadow hover:shadow-lg transition"
        >
          <button
            type="button"
            onClick={() => removeBlock(idx)}
            className="absolute right-3 top-3 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition"
            title="Xóa block"
          >
            ✕
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📝 Tiêu đề block</label>
            <input
              type="text"
              value={block.header}
              onChange={(e) => updateBlock(idx, { ...block, header: e.target.value })}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              placeholder="Nhập tiêu đề block..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">✏️ Nội dung block</label>
            <textarea
              rows="4"
              value={block.content}
              onChange={(e) => updateBlock(idx, { ...block, content: e.target.value })}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition resize-none"
              placeholder="Nhập nội dung chi tiết..."
            />
          </div>

          {block.type === "imageText" && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">🖼️ Ảnh minh họa</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                  className="w-full cursor-pointer rounded border border-gray-300 px-4 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700 transition"
                />
                {block.image && (
                  <img
                    src={block.image}
                    alt="Ảnh block"
                    className="mt-2 max-h-52 w-auto rounded-lg border object-cover shadow"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">📐 Bố cục ảnh</label>
                <select
                  value={block.layout}
                  onChange={(e) => updateBlock(idx, { ...block, layout: e.target.value })}
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                >
                  <option value="left">Ảnh trái</option>
                  <option value="right">Ảnh phải</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={() => addBlock("text")}
          className="flex-1 rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600 transition"
        >
          ➕ Thêm Text
        </button>
        <button
          type="button"
          onClick={() => addBlock("imageText")}
          className="flex-1 rounded-lg bg-purple-500 px-6 py-3 text-white hover:bg-purple-600 transition"
        >
          ➕ Thêm Ảnh + Text
        </button>
      </div>
    </div>
  );
};

export default DescriptionBuilder;
