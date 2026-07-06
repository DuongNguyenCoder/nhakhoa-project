"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DescriptionEditor from "@/components/common/DescriptionEditor";
import { createNewsAction } from "@/app/admin/news/create/actions";

const defaultValues = {
  title: "",
  slug: "",
  description: "",
  category: "",
  status: "ENABLE",
  newPic: null,
};

export default function CreateNew() {
  const router = useRouter();
  const [previewImg, setPreviewImg] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPending, startTransition] = useTransition();
  const lastAutoSlugRef = useRef("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const title = watch("title");
  const slug = watch("slug");
  const currentSlug = slugify(title || "", { lower: true, strict: true });

  useEffect(() => {
    if (!title?.trim()) {
      setValue("slug", "", { shouldDirty: true });
      lastAutoSlugRef.current = "";
      return;
    }

    if (!slug?.trim() || slug === lastAutoSlugRef.current) {
      setValue("slug", currentSlug, { shouldDirty: true });
    }

    lastAutoSlugRef.current = currentSlug;
  }, [title, slug, currentSlug, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("newPic", file, { shouldDirty: true });
    setPreviewImg(URL.createObjectURL(file));
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

    const formData = new FormData();
    formData.append("title", values.title.trim());
    formData.append("slug", values.slug?.trim() || currentSlug);
    formData.append("description", values.description || "");
    formData.append("category", values.category || "");
    formData.append("status", values.status || "ENABLE");
    formData.append("newPic", values.newPic);

    startTransition(async () => {
      try {
        const result = await createNewsAction(formData);

        if (result?.success) {
          toast.success(result.message || "Tạo tin tức thành công!");
          reset(defaultValues);
          setPreviewImg("");
          setIsFeatured(false);
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

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Tạo bài viết mới</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề bài viết"
            {...register("title", { required: "Vui lòng nhập tiêu đề" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="slug-bai-viet"
            {...register("slug", { required: "Vui lòng nhập slug" })}
          />
          {currentSlug && (
            <p className="text-sm text-gray-500">
              Xem trước:
              <a
                href={`/tin-tuc-va-khuyen-mai/${slug || currentSlug}`}
                target="_blank"
                rel="noreferrer"
                className="ml-1 text-blue-600 underline"
              >
                /tin-tuc-va-khuyen-mai/{slug || currentSlug}
              </a>
            </p>
          )}
          {errors.slug && (
            <p className="text-sm text-red-500">{errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Ảnh đại diện</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImg && (
            <img
              src={previewImg}
              alt="preview"
              className="mt-2 h-48 w-full rounded-lg border object-contain"
            />
          )}
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label>Loại tin tức</Label>
            <Input
              placeholder="Nhập loại tin tức (VD: Y học cổ truyền...)"
              {...register("category")}
              disabled={isFeatured}
              value={isFeatured ? "Tin tức nổi bật" : watch("category")}
              onChange={(e) => setValue("category", e.target.value)}
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="featuredNews"
                checked={isFeatured}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsFeatured(checked);
                  setValue("category", checked ? "Tin tức nổi bật" : "");
                }}
                className="h-4 w-4 accent-blue-600 transition"
              />
              <Label
                htmlFor="featuredNews"
                className="cursor-pointer text-sm text-gray-700"
              >
                Đặt làm <strong>Tin tức nổi bật</strong>
              </Label>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={watch("status")}
              onValueChange={(val) => setValue("status", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENABLE">Kích hoạt</SelectItem>
                <SelectItem value="DISABLE">Tạm ẩn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nội dung chi tiết</Label>
          <DescriptionEditor
            value={watch("description")}
            onChange={(value) => setValue("description", value)}
          />
        </div>

        <Button type="submit" className="mt-4 w-full" disabled={isPending}>
          {isPending ? "Đang tạo..." : "Tạo bài viết"}
        </Button>
      </form>
    </div>
  );
}
