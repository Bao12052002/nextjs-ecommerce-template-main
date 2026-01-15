"use client";
import React from "react";
// Import các dropdown khác (Bạn hãy copy file Gender, Price... từ folder cũ sang folder Shop mới)
import CategoryDropdown from "./CategoryDropdown"; 
// import GenderDropdown from "./GenderDropdown";
// import PriceDropdown from "./PriceDropdown";
import { ProductCategoryNode } from "@/types/product";

const Sidebar = ({ 
  categories, 
  closeSidebar 
}: { 
  categories: ProductCategoryNode[], 
  closeSidebar?: () => void 
}) => {
  return (
    <>
      <div className="flex items-center justify-between lg:hidden mb-4">
         <h3 className="font-semibold text-xl">Filters</h3>
         <button onClick={closeSidebar} className="text-gray-500 hover:text-blue">Close</button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Filter Box Header (Optional) */}
        <div className="bg-white shadow-1 rounded-lg py-4 px-5">
          <div className="flex items-center justify-between">
            <p>Filters:</p>
            <button className="text-blue">Clean All</button>
          </div>
        </div>

        {/* Categories (Dữ liệu thật) */}
        <CategoryDropdown categories={categories} />

        {/* Các Filter khác (Tạm ẩn hoặc import vào nếu cần) */}
        {/* <PriceDropdown /> */}
        {/* <GenderDropdown genders={[]} /> */}
      </div>
    </>
  );
};

export default Sidebar;