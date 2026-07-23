"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CategoryService } from "@/services/category.service";
import slugify from "slugify";

const defaultValues = {
  title: "",
  slug: "",
  isNews: false,
};

const CreateCategory = ({ data }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const watchTitle = watch("title");

  useEffect(() => {
    if (data && data._id) {
      reset({
        title: data.title || "",
        slug: data.slug || "",
        isNews: !!data.isNews,
      });
    } else {
      reset(defaultValues);
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    if (!values.title?.trim()) {
      toast.error("Vui lòng nhập tên phân mục.");
      return;
    }

    const payload = {
      title: values.title.trim(),
      slug: slugify(values.title),
      isNews: !!values.isNews,
    };

    try {
      if (data && data._id) {
        const result = await CategoryService.update(data._id, payload);
        if (result?.success) {
          toast.success(result.message || "Cập nhật phân mục thành công");
          router.push("/admin/category");
          return;
        }
        toast.error(result?.message || "Cập nhật thất bại");
        return;
      }

      const result = await CategoryService.create(payload);
      if (result?.success) {
        toast.success(result.message || "Tạo phân mục thành công");
        reset(defaultValues);
        router.push("/admin/category");
        return;
      }
      toast.error(result?.message || "Tạo phân mục thất bại");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tạo phân mục</h2>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/category")}
        >
          Quay lại
        </Button>
      </div>

      {/* Form Container */}
      <div className="space-y-6 rounded-2xl border border-gray-200 p-6 shadow bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên phân mục */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên phân mục <span className="text-red-500">*</span>
            </label>
            <Input {...register("title")} placeholder="Nhập tên phân mục" />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug (preview only) */}
          <div className="mb-4">
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

          {/* isNews checkbox */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              id="isNews"
              type="checkbox"
              {...register("isNews")}
              className="w-4 h-4"
            />
            <label htmlFor="isNews" className="text-sm text-gray-700">
              Hiển thị là tin tức
            </label>
          </div>

          {/* Nút submit */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={!watchTitle?.trim()}
            >
              Lưu phân mục
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
