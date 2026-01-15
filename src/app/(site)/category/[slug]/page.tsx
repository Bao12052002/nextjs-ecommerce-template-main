import React from "react";
import ShopLayout from "@/components/Shop/";
import { getProducts, getCategories } from "@/lib/fetchAPI";
import { notFound } from "next/navigation";

// Type cho params
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // 👈 Await params
  return {
    title: `Category: ${slug}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params; // 👈 Await params trước khi dùng

  const [products, categories] = await Promise.all([
    getProducts(slug),
    getCategories(),
  ]);

  const isValidCategory = categories.some((cat: any) => cat.slug === slug);
  if (!isValidCategory) {
    return notFound();
  }

  const currentCategory = categories.find((c: any) => c.slug === slug);

  return (
    <ShopLayout 
      title={currentCategory?.name || "Category"}
      products={products} 
      categories={categories} 
    />
  );
}