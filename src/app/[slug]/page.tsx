import React from "react";
import { getProducts, getCategories } from "@/lib/fetchAPI";
import { notFound } from "next/navigation";

// Hàm kiểm tra xem slug có phải là Category không (Logic giả định)
async function getCategoryData(slug: string) {
  // 1. Lấy danh sách category
  const categories = await getCategories();
  
  // 2. Tìm category hiện tại trong list
  const currentCategory = categories.find((cat: any) => cat.slug === slug);
  
  if (!currentCategory) return null;

  // 3. Nếu đúng là category, lấy sản phẩm của nó
  const products = await getProducts(slug);
  
  return { categories, products, currentCategory };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `${params.slug} - Danh mục sản phẩm` };
}

export default async function DynamicRootPage({ params }: { params: { slug: string } }) {
  // Thử lấy dữ liệu kiểu Category
  const categoryData = await getCategoryData(params.slug);


  // TRƯỜNG HỢP 2: Check xem có phải Page tĩnh (About, Contact) không?
  // const pageData = await getPage(params.slug);
  // if (pageData) return <PageTemplate data={pageData} />

  // Nếu không phải Category, cũng không phải Page -> 404
  return notFound();
}