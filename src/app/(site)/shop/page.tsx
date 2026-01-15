import React from "react";
// Đổi import từ ShopLayout sang Shop (nó sẽ tự tìm file index.tsx trong folder Shop)
import Shop from "@/components/Shop"; 
import { getProducts, getCategories } from "@/lib/fetchAPI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - All Products",
};

export default async function ShopPage() {
  // Parallel Fetching: Lấy cả 2 dữ liệu cùng lúc
  const [products, categories] = await Promise.all([
    getProducts(), 
    getCategories(),
  ]);

  console.log("Check Shop Data:", { 
    productsCount: products?.length, 
    categoriesCount: categories?.length 
  });

  // Truyền dữ liệu vào component Shop (Client Component)
  return (
    <Shop 
      title="All Products"
      initialProducts={products}  // Lưu ý: prop bên Shop/index.tsx tên là initialProducts
      categories={categories} 
    />
  );
}