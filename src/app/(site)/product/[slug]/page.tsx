import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/fetchAPI";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

// Định nghĩa Type cho params (Next.js 15+: params là Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Fix Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // 👈 Phải await ở đây
  const product = await getProductBySlug(slug);
  
  if (!product) return { title: "Sản phẩm không tồn tại" };
  
  return {
    title: `${product.name} | Cửa hàng`,
    description: product.shortDescription?.replace(/<[^>]*>?/gm, '') || "",
  };
}

// 2. Fix Component Chính
export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params; // 👈 Phải await ở đây trước khi dùng slug
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // Helper format giá
  const formatPrice = (p: string | undefined | null) => (p || "").replace(/&nbsp;/g, ' ');
  const price = formatPrice(product.salePrice || product.price);
  const regularPrice = formatPrice(product.regularPrice);

  return (
    <>
      <Breadcrumb
        title={product.name}
        pages={["shop", "product", product.name]}
      />

      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            
            {/* Cột Trái: Hình ảnh */}
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                  <div className="relative h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
                     <Image
                        src={product.image?.sourceUrl || "/images/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                     />
                  </div>
                </div>
              </div>
            </div>

            {/* Cột Phải: Thông tin */}
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="mb-8 ">
                  <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {product.name}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-3xl font-bold text-blue">
                        {price}
                    </p>
                    {product.onSale && (
                        <p className="text-xl text-gray-400 line-through">
                            {regularPrice}
                        </p>
                    )}
                  </div>

                  <div className="max-w-md mb-8 text-gray-700 dark:text-gray-400" 
                       dangerouslySetInnerHTML={{ __html: product.shortDescription || "" }} 
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <button className="flex items-center justify-center w-full p-4 text-blue border border-blue rounded-md hover:bg-blue hover:text-white lg:w-2/5 transition-all font-bold">
                      Add to Cart
                    </button>
                    <button className="flex items-center justify-center w-full p-4 text-white bg-blue rounded-md lg:w-2/5 hover:bg-opacity-90 transition-all font-bold">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mô tả chi tiết */}
          <div className="mt-10 border-t pt-10">
             <h3 className="text-xl font-bold mb-4">Description</h3>
             <div 
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description || "No description." }}
             />
          </div>
        </div>
      </section>
    </>
  );
}