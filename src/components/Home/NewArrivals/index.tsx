// src/components/Home/NewArrivals/index.tsx
"use client";
import React from "react";
import SectionTitle from "../../Common/SectionTitle";
import SingleProductItem from "../../Common/ProductItem";

// Định nghĩa lại Type cho props để tránh lỗi đỏ
interface ProductProps {
  products: any[]; // Tạm thời dùng any hoặc import type ProductNode
}

const NewArrivals = ({ products }: ProductProps) => {
  return (
    <section className="py-10 lg:py-20">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          title="New Arrivals"
          paragraph="Check out our latest collection."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* CHECK AN TOÀN TRƯỚC KHI MAP */}
          {products && products.length > 0 ? (
            products.map((product) => (
              <SingleProductItem key={product.id} item={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              <p>Chưa có sản phẩm nào.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;