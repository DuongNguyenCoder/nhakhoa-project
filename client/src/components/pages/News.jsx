"use client";

import { useEffect, useState } from "react";

import PageTitle from "@/components/pageTitle";
import { CategoryService } from "@/services/category.service";
import SectionCategoryNews from "../ui/group-news";

export default function News() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAll(
          { isNews: true },
          { cache: "no-store" },
        );

        setCategories(res.data || []);
      } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <PageTitle title="Tin Tức & Tài Liệu - Minh Dental" />

      <div className="mx-auto w-full space-y-14 px-4 py-8 md:px-6 lg:px-8">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-bold text-[#9c1d22] lg:text-3xl">
            Tin Tức & Tài Liệu
          </h1>

          <p className="mx-auto max-w-2xl text-slate-500">
            Cập nhật các thông tin, kiến thức và hoạt động mới nhất từ Minh
            Dental.
          </p>
        </div>

        <div className="space-y-14">
          {categories.map((category) => (
            <SectionCategoryNews key={category._id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
