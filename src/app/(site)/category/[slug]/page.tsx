import React from "react";
// Import đúng tên Shop để tránh nhầm lẫn
import Shop from "@/components/Shop/"; 
import { getProducts, getCategories, getCategoryBySlug } from "@/lib/fetchAPI";
import { notFound } from "next/navigation";

// Type cho params
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Category: ${slug}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // Gọi 3 API cùng lúc
const [products, categories, categoryData] = await Promise.all([
    getProducts(slug),
    getCategories(),
    getCategoryBySlug(slug) // Lấy thông tin chi tiết danh mục
  ]);

  if (!categoryData) {
    return notFound();
  }

  return (
    <Shop 
      title={categoryData.name}
      initialProducts={products} 
      categories={categories}
      // Truyền thêm data xuống
      categoryDescription={categoryData.description}
      categoryImage={categoryData.image?.sourceUrl}
    />
  );
}