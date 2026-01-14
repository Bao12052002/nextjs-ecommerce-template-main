"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SingleItem from "./SingleItem"; // Dùng component con vừa tạo
import { Product } from "@/types/product"; // Hoặc ProductNode

const BestSeller = ({ products }: { products: Product[] }) => {
  return (
    <section className="overflow-hidden py-10 lg:py-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        
        {/* */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Best Sellers
            </h2>
          </div>
        </div>

        {/* */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {products && products.length > 0 ? (
            products.slice(0, 6).map((product) => (
              <SingleItem key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-gray-500">
                No best seller products found.
            </p>
          )}
        </div>

        {/* */}
        <div className="text-center mt-12.5">
          <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BestSeller;