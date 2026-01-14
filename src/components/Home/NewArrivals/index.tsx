import React from "react";
import SectionTitle from "@/components/Common/SectionTitle";
import SingleItem from "@/components/Common/ProductItem"; // Đảm bảo bạn có component này
import { ProductNode } from "@/types/home-query";

const NewArrivals = ({ products }: { products: ProductNode[] }) => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="New Arrivals"
          paragraph="Check out our latest collection."
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

export default NewArrivals;