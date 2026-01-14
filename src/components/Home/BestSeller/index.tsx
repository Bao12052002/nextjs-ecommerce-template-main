import React from "react";
import SectionTitle from "@/components/Common/SectionTitle";
import SingleItem from "@/components/Common/ProductItem";
import { ProductNode } from "@/types/home-query";

const BestSeller = ({ products }: { products: ProductNode[] }) => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container">
        <SectionTitle
          title="Best Sellers"
          paragraph="Top selling products this week."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <SingleItem key={product.id} product={product} />
            ))
          ) : (
             <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;