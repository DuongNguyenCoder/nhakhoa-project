"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import { createNewsAction } from "@/app/admin/news/create/actions";
import PdfUploader from "@/components/uploader/PdfUploader";
import { Switch } from "@/components/ui/switch";
import { CategoryService } from "@/services/category.service";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { NewService } from "@/services/new.service";

slugify.extend({
  đ: "d",
  Đ: "D",
});

const defaultValues = {
  title: "",
  slug: "",
  overview: "",
  description: "",
  category: "",
  isActive: true,
  featured: false,
  newPic: null,
  hasPdf: false,
  pdfFile: null,
};

export default function CreateNew({ data }) {
  const router = useRouter();
  const [objectUrl, setObjectUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState([]);

  const previewImg = objectUrl || data?.newPic || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const title = watch("title");
  const slug = watch("slug");
  const hasPdf = watch("hasPdf");
  const isActive = watch("isActive");
  const featured = watch("featured");
  const currentSlug = slugify(title || "", { lower: true, strict: true });

  const fetchCategories = async () => {
    const res = await CategoryService.getAll(
      { isNews: true },
      { cache: "no-store" },
    );
    setCategories(res.data || []);
  };

  useEffect(() => {
    if (!data?._id) return;

    reset({
      title: data.title ?? "",
      slug: data.slug ?? "",
      category: data.category ?? "",
      overview: data.overview ?? "",
      description: data.description ?? "",
      isActive: data.isActive ?? true,
      featured: data.featured ?? false,
      newPic: data.newPic ?? null,
      hasPdf: data.hasPdf ?? false,
      pdfFile: data.pdfFile ?? null,
    });
  }, [data, data?._id, reset]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (title) {
      const generated = slugify(title, { lower: true });
      setValue("slug", generated, { shouldDirty: false });
    }
  }, [title, setValue]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setValue("newPic", file, { shouldDirty: true });
  //   setPreviewImg(URL.createObjectURL(file));
  // };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setValue("newPic", file, { shouldValidate: true });

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
      toast.error("Vui lòng nhập tiêu đề bài viết.");
      return;
    }

    if (!values.newPic) {
      toast.error("Vui lòng chọn ảnh đại diện.");
      return;
    }

    const payload = new FormData();
    payload.append("title", values.title.trim());
    payload.append("slug", values.slug?.trim() || currentSlug);
    payload.append("overview", values.overview || "");

    payload.append("category", values.category || "");
    payload.append("isActive", values.isActive);
    payload.append("featured", values.featured);
    payload.append("hasPdf", values.hasPdf);

    if (values.newPic instanceof File) {
      payload.append("newPic", values.newPic);
    } else if (data && data._id && data.newPic) {
      const fileName = data.newPic.split("/").pop() || "news-image.jpg";
      const file = await urlToFile(data.newPic, fileName);
      payload.append("newPic", file);
    }

    if (hasPdf) {
      payload.append("description", "");
      payload.append("pdfFile", values.pdfFile);
    } else {
      payload.append("description", values.description);
      payload.append("pdfFile", "");
    }

    startTransition(async () => {
      try {
        if (data && data._id) {
          const res = await NewService.update({ id: data._id, data: payload });
          if (res?.success) {
            toast.success(res.message || "Cập nhật danh mục thành công");
            router.push("/admin/news");
            return;
          }
          toast.error(res?.message || "Cập nhật thất bại");
          return;
        }

        const result = await createNewsAction(payload);
        console.log(result);

        if (result?.success) {
          toast.success(result.message || "Tạo tin tức thành công!");
          reset(defaultValues);
          router.push("/admin/news");
          return;
        }

        toast.error(result?.message || "Tạo bài viết thất bại.");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra khi tạo bài viết.");
      }
    });
  };

  console.log(
    watch("category"),
    categories.some((c) => c._id === watch("category")),
  );

  // console.log("data = ", data);
  // console.log("category =", getValues("category"));
  // console.log("categories =", categories.length);

  return (
    <div className=" bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {data._id ? "Cập nhật bài viết" : "Thêm mới bài viết"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Điền thông tin dưới đây để tạo một bài viết mới
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row-reverse relative"
        >
          {/* Section 4: Settings */}
          <section className="w-72 fixed">
            <h2 className="mb-3 text-sm font-semibold text-gray-700">
              Cài đặt
            </h2>

            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
              {/* Publish Setting */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">Công khai</p>
                  <p className="text-xs text-gray-600">
                    Bài viết sẽ hiển thị trên website
                  </p>
                </div>
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      className="data-[state=checked]:bg-blue-600"
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Featured Setting */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">Tin nổi bật</p>
                  <p className="text-xs text-gray-600">
                    Hiển thị trong khu vực tin nổi bật
                  </p>
                </div>
                <Controller
                  control={control}
                  name="featured"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      className="data-[state=checked]:bg-blue-600"
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* PDF Setting */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">Tài liệu PDF</p>
                  <p className="text-xs text-gray-600">
                    Thay nội dung bằng file PDF
                  </p>
                </div>
                <Controller
                  control={control}
                  name="hasPdf"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      className="data-[state=checked]:bg-blue-600"
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </section>

          <div className="space-y-6 w-full mr-76">
            {/* Section 1: Basic Info */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Thông tin cơ bản
              </h2>

              <div>
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-900"
                >
                  Tiêu đề <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Nhập tiêu đề bài viết"
                  className="mt-1.5"
                  {...register("title", {
                    required: "Tiêu đề không được để trống",
                  })}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="slug"
                  className="text-sm font-medium text-gray-900"
                >
                  Đường dẫn (tự động từ tiêu đề)
                </Label>
                <div className="mt-1.5 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2">
                  <p className="text-sm text-gray-700">
                    /tin-tuc-va-khuyen-mai/
                    <span className="font-mono font-medium text-gray-900">
                      {slug}
                    </span>
                  </p>
                </div>
                {slug && (
                  <p className="mt-2 text-xs text-gray-500">
                    Tự động tạo từ tiêu đề, không cần chỉnh sửa
                  </p>
                )}
              </div>
            </section>

            {/* Section 2: Featured Image */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Hình ảnh đại diện
              </h2>

              <div>
                <Label
                  htmlFor="image-upload"
                  className="text-sm font-medium text-gray-900"
                >
                  Tải ảnh (tỉ lệ 16:9)
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="mt-1.5"
                  onChange={handleImageChange}
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  JPG, PNG, WebP. Kích thước tối ưu: 1280x720px
                </p>
              </div>

              {previewImg && (
                <div className="mt-4 space-y-2">
                  <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                    <Image
                      src={previewImg}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* <p className="text-xs text-gray-500">
                  Kích thước: {imageDimensions.width}×{imageDimensions.height}px
                  {imageDimensions.width / imageDimensions.height !== 16 / 9 && (
                    <span className="ml-1 text-amber-600">
                      (⚠ Không phải 16:9)
                    </span>
                  )}
                </p> */}
                </div>
              )}
            </section>

            {/* Section 3: Content */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700">Nội dung</h2>

              <div>
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-900"
                >
                  Chuyên mục <span className="text-red-500">*</span>
                </Label>

                <select
                  name="category"
                  value={watch("category")}
                  onChange={(e) =>
                    setValue("category", e.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">-- Chọn phân mục --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="overview"
                  className="text-sm font-medium text-gray-900"
                >
                  Tóm tắt
                </Label>
                <Textarea
                  id="overview"
                  placeholder="Tóm tắt ngắn gọn về bài viết (một vài dòng)"
                  rows={3}
                  className="mt-1.5"
                  {...register("overview")}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900">
                  {hasPdf ? "Tài liệu PDF" : "Nội dung chi tiết"}
                </Label>
                <div className="mt-1.5">
                  {hasPdf ? (
                    <PdfUploader
                      value={watch("pdfFile")}
                      onChange={(file) =>
                        setValue("pdfFile", file, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                    />
                  ) : (
                    <DescriptionEditor
                      value={watch("description")}
                      onChange={(value) =>
                        setValue("description", value, {
                          shouldDirty: true,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex gap-3 border-t border-gray-200 pt-6">
              <Button
                type="submit"
                className="flex-1 bg-blue-700 hover:bg-blue-700/90"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⟳</span>
                    Đang lưu...
                  </>
                ) : (
                  "Lưu bài viết"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
