import React from "react";
import Shop from "@/components/Shop/"; 
import { getProducts, getCategories, getCategoryBySlug } from "@/lib/fetchAPI";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryParallaxLayout from "@/components/Shop/CategoryParallaxLayout"; 
import ShopBottomSection from "@/components/Shop/ShopBottomSection"; // Import component mới

type Props = {
  params: Promise<{ slug: string }>;
};

// --- SEO METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getCategoryBySlug(slug);
  const acfTitle = categoryData?.productCategorySettings?.cinematicSlogan;
  
  return {
    title: categoryData ? `${categoryData.name} ${acfTitle ? `- ${acfTitle}` : ""} | Tổng Kho Panel` : "Danh mục",
    description: categoryData?.description || categoryData?.productCategorySettings?.customDescription || "Chuyên cung cấp vật liệu cách nhiệt chính hãng.",
  };
}

// --- MAIN PAGE ---
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch dữ liệu song song (QUAN TRỌNG: Phải fetch xong mới có biến categoryData)
  const [products, categories, categoryData] = await Promise.all([
    getProducts(slug),
    getCategories(),
    getCategoryBySlug(slug)
  ]);

  if (!categoryData) {
    return notFound();
  }

  // 👇 ĐÃ SỬA: Chuyển xuống đây mới đúng (sau khi categoryData đã có giá trị)
  const bottomData = categoryData?.shopBottomContent || {};

  // 2. Chuẩn bị dữ liệu Breadcrumb
  const breadcrumbData = [
    { label: "Trang chủ", path: "/" },
    { label: "Cửa hàng", path: "/shop" },
    { label: categoryData.name, path: `/danh-muc-san-pham/${categoryData.slug}` },
  ];

  // 3. Render
  return (
    <CategoryParallaxLayout
      categoryData={categoryData}
      productsCount={products?.length || 0}
      breadcrumbData={breadcrumbData}
    >
      {/* Nội dung chính: Lưới sản phẩm */}
      <div className="container mx-auto px-4 md:px-8">
        <Shop 
          title={categoryData.name} // Truyền tên danh mục xuống Shop để hiển thị nếu cần
          initialProducts={products} 
          categories={categories}
        />
        
        {(!products || products.length === 0) && (
            <div className="text-center py-20">
                <h3 className="text-xl font-medium text-gray-900">Chưa có sản phẩm nào</h3>
                <p className="text-gray-500 mt-2">Vui lòng cập nhật sản phẩm từ trang quản trị.</p>
            </div>
        )}
      </div>

      {/* 👇 Section Bottom: Bài viết SEO & FAQ */}
      <ShopBottomSection 
        title={bottomData.shopSeoTitle}
        content={bottomData.shopSeoContent}
        faqs={bottomData.shopFaqs}
      />

    </CategoryParallaxLayout>
  );
}