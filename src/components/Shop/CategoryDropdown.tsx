"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProductCategoryNode } from "@/types/product";

const CategoryDropdown = ({ categories }: { categories: ProductCategoryNode[] }) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  const pathname = usePathname();

  // Kiểm tra xem có đang ở trang gốc /shop không
  // Bạn hãy thay đổi "/shop" thành đường dẫn thực tế của trang cửa hàng bạn nếu khác
  const isShopRoot = pathname === "/shop" || pathname === "/category"; 

  return (
    <div className="bg-white shadow-1 rounded-lg">
      {/* Header của Dropdown */}
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className="text-dark font-medium">Category</p>
        <button className={`text-dark ease-out duration-200 ${toggleDropdown && "rotate-180"}`}>
          <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z" fill="" />
          </svg>
        </button>
      </div>

      {/* Danh sách mục lục */}
      <div className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${toggleDropdown ? "flex" : "hidden"}`}>
        
        {/* === Link: All Categories === */}
        <Link
          href="/shop"
          className={`group flex items-center justify-between ease-out duration-200 hover:text-blue ${
            isShopRoot ? "text-blue font-medium" : "text-dark"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center rounded w-4 h-4 border ${
                isShopRoot ? "border-blue bg-blue" : "bg-white border-gray-3"
              }`}>
              {isShopRoot && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.33317 2.5L3.74984 7.08333L1.6665 5" stroke="white" strokeWidth="1.94437" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span>All Categories</span>
          </div>
        </Link>

        {/* === Loop Categories === */}
        {categories.map((category) => {
          // Tạo link tới category. Đảm bảo slug chuẩn.
          const categoryLink = `/category/${category.slug}`;
          // Kiểm tra xem URL hiện tại có trùng với link category này không
          const isSelected = pathname === categoryLink;

          return (
            <Link
              key={category.id || category.slug} // Dùng slug làm key nếu id không có
              href={categoryLink}
              className={`group flex items-center justify-between ease-out duration-200 hover:text-blue ${
                isSelected ? "text-blue font-medium" : "text-dark"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Checkbox giả */}
                <div className={`flex items-center justify-center rounded w-4 h-4 border ${
                    isSelected ? "border-blue bg-blue" : "bg-white border-gray-3"
                  }`}>
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.33317 2.5L3.74984 7.08333L1.6665 5" stroke="white" strokeWidth="1.94437" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span>{category.name}</span>
              </div>

              {/* Số lượng sản phẩm */}
              <span className={`inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue ${
                  isSelected ? "text-white bg-blue" : "bg-gray-2 text-dark"
                }`}>
                {category.count || 0}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDropdown;