import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { getProducts, getProductCategories } from "@/lib/fetchAPI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cửa hàng - Tất cả sản phẩm",
  description: "Mua sắm thiết bị điện tử chính hãng...",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(), // Lấy tất cả
    getProductCategories(),
  ]);

  return (
    <ShopWithSidebar 
      initialProducts={products} 
      categories={categories} 
    />
  );
}