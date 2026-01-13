// src/components/Home/BestSeller/index.tsx
"use client";
import React from "react";
import SectionTitle from "../../Common/SectionTitle";
import SingleProductItem from "../../Common/ProductItem";

interface ProductProps {
  products: any[];
}

const BestSeller = ({ products }: ProductProps) => {
  return (
    <section className="py-10 lg:py-20 bg-gray-1">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          title="Best Sellers"
          paragraph="Top selling products this week."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* CHECK AN TOÀN */}
          {products && products.length > 0 ? (
            products.map((product) => (
              <SingleProductItem key={product.id} item={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              <p>Chưa có dữ liệu Best Sellers.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;