"use client";

import { apiGetAllProduct } from "@/apis/ProductAPI";
import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "../ui/Pagination";
import ProductCard from "../ui/ProductCart";

const PRODUCTS_PER_PAGE = 10;

export default function ProductGrid({ directories = [] }) {
  const [products, setProducts] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  /**
   * Fetch products
   */
  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const res = await apiGetAllProduct({ limit: 9999 });

        if (mounted && res?.data?.data) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Fetch Product List Failed:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Featured products
   */
  const featuredProducts = useMemo(
    () => products.filter((product) => product.isFeatured),
    [products],
  );

  /**
   * Filter by directory
   */
  const filteredProducts = useMemo(() => {
    if (!selectedDirectory) return featuredProducts;

    return featuredProducts.filter(
      (product) => String(product.directory?._id) === selectedDirectory,
    );
  }, [featuredProducts, selectedDirectory]);

  /**
   * Total pages
   */
  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
    [filteredProducts],
  );

  /**
   * Current page products
   */
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  /**
   * Reset invalid page after filtering
   */
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  /**
   * Handlers
   */
  const handleSelectDirectory = useCallback((e) => {
    setSelectedDirectory(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (loading) return null;
  if (!featuredProducts.length) return null;

  return (
    <section className="w-full rounded-3xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide text-[#9c1d22] md:text-2xl lg:text-3xl">
            Sản phẩm nổi bật
          </h2>

          <div className="mx-auto mt-2 h-[3px] w-20 rounded-full bg-[#9c1d22]" />

          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Những sản phẩm được lựa chọn nhiều nhất và đang có ưu đãi tốt
          </p>
        </div>

        {/* Filter */}
        <select
          value={selectedDirectory}
          onChange={handleSelectDirectory}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-[#9c1d22] md:w-72"
          aria-label="Chọn danh mục sản phẩm"
        >
          <option value="">Tất cả danh mục</option>

          {directories.map((dir) => (
            <option key={dir._id} value={dir._id}>
              {dir.title}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}
      {filteredProducts.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-sm italic text-gray-500">
          Không có sản phẩm nổi bật trong danh mục này.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
