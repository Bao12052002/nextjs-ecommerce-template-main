"use client";
import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import { ProductCategoryNode } from "@/types/product";
import { useRouter } from "next/navigation"; // Import useRouter

const Sidebar = ({ 
  categories, 
  closeSidebar 
}: { 
  categories: ProductCategoryNode[], 
  closeSidebar?: () => void 
}) => {
  const router = useRouter(); // Hook để chuyển trang

  return (
    <>
      <div className="flex items-center justify-between lg:hidden mb-4">
         <h3 className="font-semibold text-xl">Filters</h3>
         <button onClick={closeSidebar} className="text-gray-500 hover:text-blue">Close</button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Filter Box Header */}
        <div className="bg-white shadow-1 rounded-lg py-4 px-5">
          <div className="flex items-center justify-between">
            <p>Filters:</p>
            {/* Logic Clean All: Chuyển về trang gốc /shop */}
            <button 
              onClick={() => router.push('/shop')} 
              className="text-blue hover:underline"
            >
              Clean All
            </button>
          </div>
        </div>

        {/* Categories */}
        <CategoryDropdown 
            categories={categories} 
            // Truyền hàm closeSidebar xuống để đóng khi click category (nếu cần)
        />
      </div>
    </>
  );
};

export default Sidebar;