"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ProductNode } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch } from "@/redux/store";
import { getProductLink } from "@/utils/routes"; // Import hàm tạo link sản phẩm

const SingleGridItem = ({ product }: { product: ProductNode }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // Xử lý dữ liệu an toàn
  const imgUrl = product.image?.sourceUrl || "/images/placeholder.png";
  const displayPrice = product.salePrice || product.price; // Ưu tiên giá sale
  const regularPrice = product.regularPrice;
  
  // 👇 TẠO LINK CHUẨN SEO (VD: /p/macbook-pro)
  const productUrl = getProductLink(product.slug);

  // --- Handlers ---
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...product }));
    openModal();
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity: 1 }));
  };

  const handleItemToWishList = () => {
    dispatch(addItemToWishlist({ ...product, status: "available", quantity: 1 }));
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-[250px] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <Link href={productUrl} className="block w-full h-full relative">
          <Image
            src={imgUrl}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        
        {/* Badges (Sale/New) - Ví dụ nếu có */}
        {product.onSale && (
          <span className="absolute top-3 left-3 bg-red text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}

        {/* Hover Actions (QuickView, AddCart, Wishlist) */}
        <div className="absolute right-0 bottom-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col gap-2 p-3">
          <button onClick={handleQuickViewUpdate} className="w-9 h-9 flex items-center justify-center bg-white rounded shadow text-dark hover:bg-blue hover:text-white transition">
             {/* Icon Eye */}
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </button>
          <button onClick={handleAddToCart} className="w-9 h-9 flex items-center justify-center bg-white rounded shadow text-dark hover:bg-blue hover:text-white transition">
             {/* Icon Cart */}
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
          <button onClick={handleItemToWishList} className="w-9 h-9 flex items-center justify-center bg-white rounded shadow text-dark hover:bg-blue hover:text-white transition">
             {/* Icon Heart */}
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <div className="flex justify-center items-center gap-1 mb-2">
           {/* Stars Rating (Giả lập hoặc lấy từ product.averageRating) */}
           {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xs">★</span>
           ))}
           <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
        </div>

        <h3 className="font-medium text-dark hover:text-blue transition mb-2 line-clamp-2 min-h-[48px]">
          <Link href={productUrl}>
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-blue text-lg">{displayPrice}</span>
          {regularPrice && regularPrice !== displayPrice && (
            <span className="text-gray-400 text-sm line-through">{regularPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleGridItem;