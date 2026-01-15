import React from "react";
// Import component chi tiết (ví dụ: ProductDetails)
// import ProductDetails from "@/components/Shop/ProductDetails"; 

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `Sản phẩm: ${params.slug}` };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold">Chi tiết sản phẩm: {params.slug}</h1>
      {/* <ProductDetails slug={params.slug} /> */}
    </div>
  );
}