"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import slugify from "slugify";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { CategoryService } from "@/services/category.service";
import { DirectoryService } from "@/services/directory.service";

slugify.extend({
  đ: "d",
  Đ: "D",
});

const defaultValues = {
  title: "",
  slug: "",
  category: [],
  directoryPic: null,
};

const CreateDirectory = ({ data }) => {
  const router = useRouter();
  const [objectUrl, setObjectUrl] = useState("");
  const [categories, setCategories] = useState(
    /** @type {{ _id: string; title: string }[]} */ ([]),
  );

  const previewImg = objectUrl || data?.directoryPic || "";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const watchTitle = useWatch({ control, name: "title" });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await CategoryService.getAll({}, {});
        if (res?.success) {
          setCategories(res.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (data && data._id) {
      reset({
        title: data.title || "",
        slug: data.slug || "",
        category: data.category || [],
        directoryPic: data.directoryPic || null,
      });
    } else {
      reset(defaultValues);
    }
  }, [data, reset]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setValue("directoryPic", file, { shouldValidate: true });

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl("");
    }

    if (file) {
      const newUrl = URL.createObjectURL(file);
      setObjectUrl(newUrl);
    }
  };

  const urlToFile = async (url, fileName) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type || "image/jpeg" });
  };

  const onSubmit = async (values) => {
    if (!values.title?.trim()) {
      toast.error("Vui lòng nhập tên danh mục.");
      return;
    }

    console.log(values.directoryPic);
    console.log(values.directoryPic instanceof File);

    const categories = Array.isArray(values.category)
      ? values.category
      : values.category
        ? [values.category]
        : [];

    const submitData = new FormData();
    submitData.append("title", values.title.trim());
    submitData.append(
      "slug",
      slugify(values.title.trim(), { lower: true, strict: true }),
    );

    if (values.directoryPic instanceof File) {
      submitData.append("directoryPic", values.directoryPic);
    } else if (data && data._id && data.directoryPic) {
      const fileName =
        data.directoryPic.split("/").pop() || "directory-image.jpg";
      const file = await urlToFile(data.directoryPic, fileName);
      submitData.append("directoryPic", file);
    } else {
      toast.error("Vui lòng chọn ảnh danh mục.");
      return;
    }

    categories.forEach((catId) => {
      submitData.append("category[]", catId);
    });

    try {
      if (data && data._id) {
        const res = await DirectoryService.update(data._id, submitData);
        if (res?.success) {
          toast.success(res.message || "Cập nhật danh mục thành công");
          router.push("/admin/directory");
          return;
        }
        toast.error(res?.message || "Cập nhật thất bại");
        return;
      }

      const res = await DirectoryService.create(submitData);
      if (res?.success) {
        toast.success("Tạo danh mục thành công!");
        reset(defaultValues);
        router.push("/admin/directory");
        return;
      }
      toast.error(res.data?.message || "Tạo danh mục thất bại.");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi tạo danh mục.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tạo danh mục sản phẩm</h2>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/directory")}
        >
          Quay lại
        </Button>
      </div>

      <div className="space-y-6 rounded-lg border p-6 shadow bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên danh mục <span className="text-red-500">*</span>
            </label>
            <Input
              {...register("title", {
                required: "Vui lòng nhập tên danh mục.",
              })}
              placeholder="Nhập tên danh mục"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <p className="text-sm text-gray-700">
              {watchTitle
                ? `/category/${slugify(watchTitle, { lower: true })}`
                : "(chưa có)"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Slug được tự động sinh từ title và không thể chỉnh sửa trực tiếp.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ảnh danh mục <span className="text-red-500">*</span>
            </label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.directoryPic && (
              <p className="text-sm text-red-500 mt-1">
                {errors.directoryPic.message}
              </p>
            )}
            {previewImg && (
              <div className="mt-3 relative w-50 aspect-square rounded border overflow-hidden">
                <Image
                  src={previewImg}
                  alt="preview"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn phân mục
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto rounded border border-gray-200 p-3">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={cat._id}
                      {...register("category")}
                      className="h-4 w-4 accent-green-600"
                    />
                    <span>{cat.title}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500">Đang tải phân mục...</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={!watchTitle?.trim() || !previewImg}
            >
              Lưu danh mục
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDirectory;
