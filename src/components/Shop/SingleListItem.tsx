"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { ProductNode } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch } from "@/redux/store";
import { getProductLink } from "@/utils/routes";

const SingleListItem = ({ product }: { product: ProductNode }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  if (!product) return null;

  // --- MAP DỮ LIỆU ĐÚNG ---
  const imgUrl = product.image?.sourceUrl || "/images/placeholder.png";
  const productUrl = getProductLink(product.slug);
  const displayPrice = (product.salePrice || product.price || "Liên hệ").replace(/&nbsp;/g, ' ');
  const regularPrice = (product.regularPrice || "").replace(/&nbsp;/g, ' ');

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
    <div className="group rounded-lg bg-white shadow-1">
      <div className="flex flex-col sm:flex-row">
        {/* Cột Trái: Ảnh */}
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          <Link href={productUrl}>
            <Image src={imgUrl} alt={product.name} width={250} height={250} className="object-contain" />
          </Link>
          
          {/* Quick View Button Overlay */}
          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button onClick={handleQuickViewUpdate} className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue">
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 5.5C6.61945 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61945 10.5 8 10.5C9.38087 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38087 5.5 8 5.5ZM6.5 8C6.5 7.17157 7.17174 6.5 8 6.5C8.82859 6.5 9.5 7.17157 9.5 8C9.5 8.82842 8.82859 9.5 8 9.5C7.17174 9.5 6.5 8.82842 6.5 8Z" fill="" /><path d="M8 2.16666C4.99074 2.16666 2.96369 3.96946 1.78721 5.49791C1.25487 6.18928 0.833496 7.40779 0.833496 8C0.833496 8.5922 1.25487 9.81072 1.78721 10.5021C2.96369 12.0305 4.99074 13.8333 8 13.8333C11.0096 13.8333 13.0366 12.0305 14.2131 10.5021C14.7455 9.81072 15.1668 8.5922 15.1668 8C15.1668 7.40779 14.7455 6.18927 14.2131 5.49791C13.0366 3.96946 11.0096 2.16666 8 2.16666Z" fill="" /></svg>
            </button>
          </div>
        </div>

        {/* Cột Phải: Thông tin */}
        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
              <Link href={productUrl}> {product.name} </Link>
            </h3>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#FBB040"/></svg>
                ))}
              </div>
              <p className="text-custom-sm">({product.reviewCount || 0})</p>
            </div>

            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark">{displayPrice}</span>
              {product.onSale && regularPrice !== displayPrice && (
                <span className="text-dark-4 line-through text-base">{regularPrice}</span>
              )}
            </span>
          </div>

          <div className="flex flex-col gap-2">
             <button onClick={handleAddToCart} className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark text-center justify-center">
              Add to cart
            </button>
             <button onClick={handleItemToWishList} className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-gray-1 text-dark ease-out duration-200 hover:bg-gray-2 text-center justify-center border">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;