// src/components/Common/ProductItem.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { AppDispatch } from "@/redux/store";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // --- 1. XỬ LÝ DỮ LIỆU THÔNG MINH (QUAN TRỌNG) ---
  
  // Lấy Tên: Ưu tiên name (WP) -> title (Static)
  const productName = item.name || item.title || "Sản phẩm không tên";
  
  // Lấy Ảnh: Ưu tiên image.sourceUrl (WP) -> imgs.previews[0] (Static) -> Ảnh mặc định
  const productImg = item.image?.sourceUrl || item.imgs?.previews?.[0] || "/images/placeholder.png";
  
  // Lấy Giá: Ưu tiên salePrice (WP) -> discountedPrice (Static) -> price
  // Lưu ý: WP trả về chuỗi có sẵn ký tự đ (ví dụ "100.000₫"), Static là số.
  const displayPrice = item.salePrice || item.discountedPrice || item.price;
  const originalPrice = item.regularPrice || item.price;

  // Lấy đánh giá
  const reviewCount = item.reviewCount || item.reviews || 0;

  // --- Hết phần xử lý dữ liệu ---

  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        title: productName, // Map lại tên chuẩn cho Cart
        price: typeof displayPrice === 'string' ? parseFloat(displayPrice) : displayPrice, // Xử lý giá tiền cho Cart
        quantity: 1,
        // Đảm bảo Cart có ảnh để hiển thị
        imgs: item.imgs || { previews: [productImg], thumbnails: [productImg] } 
      })
    );
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        title: productName,
        status: "available",
        quantity: 1,
        imgs: item.imgs || { previews: [productImg], thumbnails: [productImg] }
      })
    );
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4">
        {/* Render ảnh an toàn */}
        <div className="relative w-[250px] h-[250px]">
           <Image 
             src={productImg} 
             alt={productName} 
             fill
             className="object-contain" // Giữ tỉ lệ ảnh đẹp
           />
        </div>

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="Quick view"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            {/* Icon Quick View */}
            <svg width="16" height="16" viewBox="0 0 16 16" className="fill-current">
               <path d="M8 5.5C6.619 5.5 5.5 6.619 5.5 8s1.119 2.5 2.5 2.5S10.5 9.381 10.5 8 9.381 5.5 8 5.5zm0 1C7.172 6.5 6.5 7.172 6.5 8s.672 1.5 1.5 1.5S9.5 8.828 9.5 8 8.828 6.5 8 6.5z" />
               <path d="M8 2.167C4.99 2.167 2.964 3.97 1.787 5.498c-.287.373-.532.691-.7 1.068-.177.403-.254.842-.254 1.434 0 .592.077 1.031.254 1.434.168.377.413.695.7 1.068 1.177 1.528 3.203 3.331 6.213 3.331 3.01 0 5.036-1.803 6.213-3.331.287-.373.532-.691.7-1.068.177-.403.254-.842.254-1.434 0-.592-.077-1.031-.254-1.434-.168-.377-.413-.695-.7-1.068-1.177-1.528-3.203-3.331-6.213-3.331zm0 1c2.567 0 4.334 1.53 5.42 2.941.294.38.465.607.578.862.105.238.169.53.169 1.03 0 .501-.064.792-.169 1.03-.113.255-.284.482-.578.862-1.086 1.411-2.853 2.941-5.42 2.941-2.567 0-4.334-1.53-5.42-2.941-.294-.38-.465-.607-.578-.862-.105-.238-.169-.53-.169-1.03 0-.501.064-.792.169-1.03.113-.255.284-.482.578-.862C3.666 4.697 5.433 3.167 8 3.167z" />
            </svg>
          </button>

          <button
            onClick={() => handleAddToCart()}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            Add to cart
          </button>

          <button
            onClick={() => handleItemToWishList()}
            aria-label="Add to wishlist"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            {/* Icon Heart */}
            <svg width="16" height="16" viewBox="0 0 16 16" className="fill-current">
               <path d="M3.75 2.95C2.644 3.455 1.833 4.657 1.833 6.091c0 1.465.6 2.594 1.46 3.562.708.798 1.565 1.459 2.4 2.103.2.153.398.305.592.458.35.276.663.519.964.695.302.176.545.257.751.257.206 0 .449-.08.75-.257.302-.176.615-.419.965-.695.194-.153.392-.305.59-.458.836-.644 1.693-1.305 2.402-2.103.86-1.127 1.459-2.256 1.459-3.721 0-1.434-.81-2.636-1.916-3.142-1.074-.491-2.518-.361-3.89.924-.094.098-.224.153-.36.153-.136 0-.266-.055-.36-.153-1.372-1.425-2.816-1.555-3.89-.924zm4.25.023c-1.541-1.379-3.267-1.572-4.666-.932-1.477.675-2.5 2.243-2.5 4.051 0 1.777.74 3.133 1.711 4.226.777.875 1.729 1.608 2.57 2.255.19.147.375.289.55.428.342.269.709.556 1.08.773.372.217.796.393 1.255.393s.884-.176 1.256-.393c.371-.217.738-.504 1.08-.773.176-.139.36-.281.55-.428.841-.647 1.792-1.38 2.57-2.255.97-1.093 1.71-2.449 1.71-4.226 0-1.808-1.023-3.376-2.5-4.051-1.399-.64-3.125-.447-4.666.932z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1 text-yellow-400">
           {/* Render 5 sao đơn giản */}
           {[1,2,3,4,5].map(star => (
             <span key={star}>★</span>
           ))}
        </div>
        <p className="text-custom-sm">({reviewCount})</p>
      </div>

      {/* Tên sản phẩm */}
      <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
        <Link href={`/shop-details/${item.slug || item.id}`}> {productName} </Link>
      </h3>

      {/* Giá */}
      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">{displayPrice}</span>
        {originalPrice && originalPrice !== displayPrice && (
            <span className="text-dark-4 line-through text-sm">{originalPrice}</span>
        )}
      </span>
    </div>
  );
};

export default ProductItem;