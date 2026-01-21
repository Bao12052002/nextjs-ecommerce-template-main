// src/components/Common/CartSidebarModal/SingleItem.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "@/redux/features/cart-slice";
import { formatVND } from "@/utils/formatCurrency"; // 👇 Import hàm format

const SingleItem = ({ item }: { item: any }) => {
  const dispatch = useDispatch();

  // Tính giá hiển thị (ưu tiên giá sale)
  const price = item.discountedPrice || item.price;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-3">
      <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 border border-gray-3">
        <Image
          src={item.imgs?.thumbnails?.[0] || "/images/placeholder.png"}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-dark hover:text-blue truncate mb-1">
          <Link href={`/product/${item.slug || "#"}`}>
            {item.title}
          </Link>
        </h4>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{item.quantity} x</span>
          {/* 👇 Hiển thị giá VNĐ */}
          <span className="font-semibold text-dark">
            {formatVND(price)}
          </span>
        </div>
      </div>

      <button
        onClick={() => dispatch(removeItemFromCart(item.id))}
        className="group flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red hover:bg-red/10 rounded-full transition"
        aria-label="Remove item"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="fill-current">
           <path fillRule="evenodd" clipRule="evenodd" d="M15.8333 5.83333L4.16666 5.83333C3.93654 5.83333 3.75 6.01988 3.75 6.25C3.75 6.48012 3.93654 6.66667 4.16666 6.66667H15.8333C16.0635 6.66667 16.25 6.48012 16.25 6.25C16.25 6.01988 16.0635 5.83333 15.8333 5.83333Z"/>
           <path fillRule="evenodd" clipRule="evenodd" d="M8.33334 9.16667C8.33334 8.93655 8.51989 8.75 8.75001 8.75C8.98013 8.75 9.16667 8.93655 9.16667 9.16667V14.1667C9.16667 14.3968 8.98013 14.5833 8.75001 14.5833C8.51989 14.5833 8.33334 14.3968 8.33334 14.1667V9.16667Z"/>
           <path fillRule="evenodd" clipRule="evenodd" d="M11.6667 8.75C11.4365 8.75 11.25 8.93655 11.25 9.16667V14.1667C11.25 14.3968 11.4365 14.5833 11.6667 14.5833C11.8968 14.5833 12.0833 14.3968 12.0833 14.1667V9.16667C12.0833 8.93655 11.8968 8.75 11.6667 8.75Z"/>
           <path fillRule="evenodd" clipRule="evenodd" d="M16.6667 5.83333V16.6667C16.6667 17.5871 15.9205 18.3333 15 18.3333H5.00001C4.07954 18.3333 3.33334 17.5871 3.33334 16.6667V5.83333C3.33334 5.60321 3.14679 5.41667 2.91667 5.41667C2.68655 5.41667 2.50001 5.60321 2.50001 5.83333V16.6667C2.50001 18.0474 3.6193 19.1667 5.00001 19.1667H15C16.3807 19.1667 17.5 18.0474 17.5 16.6667V5.83333C17.5 5.60321 17.3135 5.41667 17.0833 5.41667C16.8532 5.41667 16.6667 5.60321 16.6667 5.83333Z"/>
           <path fillRule="evenodd" clipRule="evenodd" d="M13.3333 5.83333V4.16667C13.3333 3.24619 12.5871 2.5 11.6667 2.5H8.33334C7.41287 2.5 6.66667 3.24619 6.66667 4.16667V5.83333C6.66667 6.06345 6.48012 6.25 6.25001 6.25C6.01989 6.25 5.83334 6.06345 5.83334 5.83333V4.16667C5.83334 2.78596 6.95263 1.66667 8.33334 1.66667H11.6667C13.0474 1.66667 14.1667 2.78596 14.1667 4.16667V5.83333C14.1667 6.06345 13.9801 6.25 13.75 6.25C13.5199 6.25 13.3333 6.06345 13.3333 5.83333Z"/>
        </svg>
      </button>
    </div>
  );
};

export default SingleItem;