// src/components/Home/NewArrivals/index.tsx
"use client";
import React from "react";
import SectionTitle from "../../Common/SectionTitle";
import SingleProductItem from "../../Common/ProductItem"; // Alias cho ProductItem
import { Product } from "@/types/product"; // Dùng Type chuẩn

const NewArrivals = ({ products }: { products: Product[] }) => {
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
          {products?.length > 0 ? (
            products.map((product) => (
              // 👇 SỬA Ở ĐÂY: đổi item={product} thành product={product}
              <SingleProductItem key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center py-10">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;