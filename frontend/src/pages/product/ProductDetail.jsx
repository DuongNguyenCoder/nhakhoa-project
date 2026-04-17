import { apiGetAllProduct, apiGetOneProduct } from "@/apis/ProductAPI";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import BuyNowButton from "@/components/buttons/BuyNowButton";
import ProductCard from "@/components/ui/ProductCart";
import { setCurrentUser } from "@/redux/appSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { CubeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "@/components/ui/Pagination";
import { apiAddToCard, apiGetCurrent } from "@/apis/userAPI";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "@/components/pageTitle";
import { ProductContext } from "@/layout/ProductLayout";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const { isSignIn } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const { setProductTitle }  = useContext(ProductContext);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  //API GET ONE PRODUCT
  useEffect(() => {
    const getOneProduct = async () => {
      const response = await apiGetOneProduct(productId);
      console.log("FULL GET ONE PRODUCT: ", response);
      setProduct(response.data.data);
      setProductTitle(response?.data?.data?.title);
    };
    getOneProduct();
    return () => setProductTitle(null);
  }, [productId, setProductTitle]);
  //END

  //API GET ALL PRODUCT
  useEffect(() => {
    const getALLProduct = async () => {
      if (!product?.directory) return; // ✅ chặn gọi API khi directory chưa sẵn sàng
      const res = await apiGetAllProduct({
        directory: product.directory,
        page: currentPage,
        limit: 7,
      });
      if (res?.data?.data) {
        setAllProduct(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      } else {
        console.log("Lỗi rồi con ạ!");
      }
    };
    getALLProduct();
  }, [product?.directory, currentPage]);
  //END
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.productPics.length - 1 : prevIndex - 1,
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.productPics.length ? 0 : prevIndex + 1,
    );
  };

  if (!product) return <div>Đang tải...</div>;
  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100,
  );

  const items = [
    {
      product: product._id,
      quantity: quantity,
    },
  ];
  const handleAddToCard = async () => {
    if (!isSignIn) {
      toast.warning("Vui lòng đăng nhập để mua hàng!");
      navigate("/dang-nhap");
      return false;
    }
    const res = await apiAddToCard({ products: items });
    console.log("API ADD TO CARD: ", res);
    if (res.data.success) {
      const res = await apiGetCurrent();
      if (res?.data?.data) {
        dispatch(setCurrentUser(res.data.data));
      }
      toast.success("Đã thêm vào giỏ hàng!");
      return true;
    } else {
      toast.error("Thêm thất bại!");
      return false;
    }
  };

  const renderDescription = (descriptionJson) => {
    if (!descriptionJson) return null;
    let data;
    try {
      data = JSON.parse(descriptionJson);
    } catch (error) {
      console.error("Mô tả không phải JSON hợp lệ:", error);
      return <p>Mô tả không khả dụng.</p>;
    }

    return (
      <div className="space-y-6">
        {data.mainHeader && (
          <h2 className="text-center text-xl py-1 sm:text-2xl font-bold text-red-600 shadow-md">
            {data.mainHeader}
          </h2>
        )}
        {Array.isArray(data.blocks) &&
          data.blocks.map((block, index) => (
            <div key={index} className="space-y-2">
              {block.type === "text" && block.content && (
                <div className="">
                  {block.header && (
                    <h3 className="text-lg xl:text-xl font-medium text-gray-800">
                      {block.header}
                    </h3>
                  )}
                  <p className="whitespace-pre-line text-base xl:text-lg text-gray-700">{block.content}</p>
                </div>
              )}
              {block.type === "imageText" && (
                <div
                  className={`flex flex-col-reverse gap-4 md:flex-row ${
                    block.layout === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {block.image && (
                    <div className="w-auto flex justify-center">
                    <img
                      src={block.image}
                      alt="img-description"
                      className="h-auto w-[300px] md:w-[250px] xl:w-[300px] flex-none rounded shadow"
                    />
                    </div>
                  )}
                  <div className="mt-2 space-y-2">
                    {block.header && (
                      <h3 className="text-lg xl:text-xl font-medium text-gray-800">
                        {block.header}
                      </h3>
                    )}
                    {block.content && (
                      <p className="whitespace-pre-line text-base xl:text-lg text-gray-700">{block.content}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <PageTitle title="Product Detail - Minh Dental" />
      <div className="w-full">
        {/* SẢN PHẨM */}
        <div className="flex w-full flex-col items-center gap-5 rounded-2xl bg-white shadow-xl md:flex-row md:items-start md:p-3">
          {/* Ảnh Sản Phẩm */}
          <div className="mt-2 flex w-full flex-col items-center gap-2 border-b-8 pb-4 md:ml-3 md:mr-6 md:mt-0 md:w-[40%] md:border-none md:pb-0 lg:ml-5">
            <div className="h-[350px] w-[350px] overflow-hidden rounded-md border md:h-[270px] md:w-[270px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]">
              <img
                src={product.productPics[currentIndex]}
                className="h-full w-full cursor-pointer object-cover object-center"
              />
            </div>
            <div className="mt-2 flex items-center gap-2 md:mt-0">
              <ChevronLeftIcon onClick={handlePrev} className="size-5" />
              {product.productPics.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-[70px] w-[70px] border-2 ${
                    currentIndex === index
                      ? "border-green-500"
                      : "border-transparent"
                  } cursor-pointer overflow-hidden rounded-md`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
              <ChevronRightIcon onClick={handleNext} className="size-5" />
            </div>
          </div>
          {/* END */}

          <div
            id="product_detail"
            className="flex w-full flex-col gap-2 md:w-[65%]"
          >
            <div className="w-full border-b border-gray-400 px-3 pb-3 md:px-0">
              <h2 className="mb-2 text-start text-2xl font-medium">
                {product.title}
              </h2>
              <div className="mb-2 flex items-center gap-5 px-3">
                <span className="flex h-5 w-[70px] cursor-pointer items-center justify-center gap-1.5 rounded-sm bg-blue-600 p-0.5 text-xs text-white">
                  <HandThumbUpIcon className="size-[15px]" /> Thích 9
                </span>
                <span className="flex cursor-pointer items-center gap-1 text-xs">
                  <ShareIcon className="size-4" /> Chia sẻ
                </span>
              </div>
              <h3 className="text-base font-medium text-gray-800">
                Tính năng nổi bật
              </h3>
              <span className="line-clamp-3 font-sans text-base font-normal text-gray-700">
                {product.introduce}
              </span>
              <div className="mt-1 flex flex-col text-base font-normal text-gray-500">
                <span>Thương hiệu: {product.brand}</span>
                <span>Xuất xứ: {product.origin}</span>
              </div>
            </div>

            {/* GIÁ + SỐ LƯỢNG + BUTTON */}
            <div className="mt-3 flex flex-col gap-4 px-4 pb-5 md:gap-3 md:px-0 md:pb-0">
              {/* Giá và số lượng */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col text-base text-gray-800">
                  <span>
                    Giá gốc:{" "}
                    {product.originalPrice === 0 ? (
                      <a
                        href="tel: (+84 4) 3852 3643"
                        className="font-medium text-red-600"
                      >
                        Liên hệ
                      </a>
                    ) : (
                      <span className="line-through">
                        {product.originalPrice.toLocaleString()}₫
                      </span>
                    )}
                  </span>

                  {product.salePrice !== 0 && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.salePrice.toLocaleString()}₫
                      </span>
                      <span className="rounded bg-red-500 px-1.5 py-0.5 text-xs text-white">
                        -{discount || 0}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Thanh số lượng */}
                <div className="mt-3 flex items-center gap-4 md:mt-0">
                  <span className="font-normal text-gray-700">Số Lượng</span>
                  <div className="flex w-fit items-center overflow-hidden rounded border">
                    <MinusIcon
                      onClick={handleDecrease}
                      className="size-5 text-lg font-bold text-gray-600 hover:bg-gray-100"
                    />
                    <div className="w-12 text-center font-semibold text-slate-600">
                      {quantity}
                    </div>
                    <PlusIcon
                      onClick={handleIncrease}
                      className="size-5 text-lg font-bold text-gray-600 hover:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex w-full flex-col gap-4 md:flex-row md:justify-start">
                <BuyNowButton
                  onclick={async () => {
                    const success = await handleAddToCard();
                    if (success) navigate("/check-out-step1");
                  }}
                />
                <AddToCartButton onClick={handleAddToCard} />
              </div>
            </div>

            {/* END */}
          </div>
        </div>
        {/* END*/}

        {/* MÔ TẢ CHI TIẾT */}
        <div className="mt-5 w-full bg-white p-3 shadow-lg">
          <div className="w-full border-b p-2">
            <h2 className="text-sm lg:text-base font-medium">MÔ TẢ SẢN PHẨM</h2>
          </div>
          <div className="w-full max-w-none overflow-x-auto break-words px-4 pb-6 md:px-6 xl:px-8">
            <div>{renderDescription(product.description)}</div>
          </div>
        </div>

        {/* END */}

        {/* SẢN PHẨM LIÊN QUAN */}
        <div className="mt-5 w-full bg-white p-4 shadow-md">
          <div className="mb-3 flex w-full gap-1.5 p-2 text-blue-800">
            <CubeIcon className="size-7" />
            <h2 className="font-normal">SẢN PHẨM LIÊN QUAN</h2>
          </div>
          <div className="grid w-full grid-cols-2 gap-5 px-5 md:grid-cols-3 md:px-0 xl:grid-cols-4">
            {allProduct?.length > 0 ? (
              allProduct.map((product) => (
                <ProductCard key={product._id} item={product} />
              ))
            ) : (
              <div>Không có sản phẩm liên quan</div>
            )}
          </div>
          <div className="w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
        {/* END */}
      </div>
    </>
  );
};

export default ProductDetail;
