"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Dùng usePathname để so sánh link hiện tại
import { ProductCategoryNode } from "@/types/product";
import { getCategoryLink, getShopLink } from "@/utils/routes"; // Import hàm quản lý link

const CategoryDropdown = ({ categories }: { categories: ProductCategoryNode[] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname(); // Lấy đường dẫn hiện tại (VD: /laptop)

  // Link trang cửa hàng chung (VD: /san-pham)
  const shopLink = getShopLink();

  return (
    <div className="bg-white shadow-1 rounded-lg py-4 px-5 mb-5">
      {/* Header Dropdown */}
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-xl text-dark">Categories</h3>
        <svg
          className={`fill-current duration-200 ${isOpen ? "rotate-180" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.6921 7.09327C3.91666 6.83119 4.31119 6.80084 4.57327 7.0254L9.99992 11.6768L15.4266 7.0254C15.6886 6.80084 16.0832 6.83119 16.3077 7.09327C16.5323 7.35535 16.5019 7.74989 16.2399 7.97445L10.4066 12.9745C10.1726 13.175 9.82728 13.175 9.59327 12.9745L3.75992 7.97445C3.49784 7.74989 3.4675 7.35535 3.6921 7.09327Z"
            fill=""
          />
        </svg>
      </div>

      {/* List Categories */}
      <div className={`flex flex-col gap-3 ${isOpen ? "block" : "hidden"}`}>
        
        {/* Link: All Categories */}
        <Link
          href={shopLink}
          className={`flex items-center justify-between text-custom-sm group ${
            pathname === shopLink
              ? "text-blue font-medium"
              : "text-dark hover:text-blue"
          }`}
        >
          All Categories
        </Link>

        {/* Link: Dynamic Categories */}
        {categories && categories.length > 0 ? (
          categories.map((cat) => {
            const categoryUrl = getCategoryLink(cat.slug); // Lấy link chuẩn SEO (VD: /laptop)
            const isActive = pathname === categoryUrl;

            return (
              <Link
                key={cat.id}
                href={categoryUrl}
                className={`flex items-center justify-between text-custom-sm group ${
                  isActive
                    ? "text-blue font-medium"
                    : "text-dark hover:text-blue"
                }`}
              >
                {cat.name}
                
                {/* Count Badge */}
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full border text-2xs ease-out duration-200 ${
                    isActive
                      ? "bg-blue border-blue text-white"
                      : "border-gray-3 text-dark group-hover:bg-blue group-hover:border-blue group-hover:text-white"
                  }`}
                >
                  {cat.count || 0}
                </span>
              </Link>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDropdown;