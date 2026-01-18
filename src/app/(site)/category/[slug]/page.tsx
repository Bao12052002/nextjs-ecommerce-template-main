// src/app/(site)/category/[slug]/page.tsx
import React from "react";
import Shop from "@/components/Shop/"; 
import { getProducts, getCategories, getCategoryBySlug } from "@/lib/fetchAPI";
import { notFound } from "next/navigation";
import CinematicCategoryHeader from "@/components/Common/CinematicCategoryHeader"; // 👈 Dùng Component Mới
import { Metadata } from "next";

// --- HÀM HELPER TẠO COPYWRITING (Tạm thời) ---
// Giúp biến tên danh mục thường thành văn phong Apple
const getCinematicCopy = (categoryName: string) => {
  const mapping: Record<string, string> = {
    "Laptop": "Hiệu năng. Quái thú.",
    "Smartphone": "Tương lai. Trong tay.",
    "Panel Cách Nhiệt": "Vững chãi. Tuyệt đối.", // Ví dụ cho ngành của bạn
    "Phụ kiện": "Chi tiết. Hoàn hảo.",
  };
  return mapping[categoryName] || `Đỉnh cao của ${categoryName}`;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getCategoryBySlug(slug);
  return {
    title: categoryData ? `${categoryData.name} - Cinematic Series` : "Danh mục",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [products, categories, categoryData] = await Promise.all([
    getProducts(slug),
    getCategories(),
    getCategoryBySlug(slug)
  ]);

  if (!categoryData) {
    return notFound();
  }

  const breadcrumbData = [
    { label: "Home", url: "/" },
    { label: "Series", url: "/shop" },
    { label: categoryData.name, url: `/category/${categoryData.slug}` },
  ];

  // Lấy câu Slogan theo công thức
  const cinematicSubtitle = getCinematicCopy(categoryData.name);

 return (
    <main className="bg-black"> {/* Đổi nền main thành đen để khớp với header */}
      
      {/* 1. Header Sticky (Parallax) */}
      <div className="sticky top-0 -z-10"> 
          <CinematicCategoryHeader 
            title={categoryData.name}
            subtitle="Siêu phẩm. Tinh hoa." // Câu slogan mẫu
            image={categoryData.image?.sourceUrl}
            breadcrumbPages={breadcrumbData}
          />
      </div>

      {/* 2. Shop Section (Trượt lên) */}
      {/* Tăng min-h-screen để đảm bảo nội dung đủ dài để cuộn */}
      <div className="relative z-10 bg-white min-h-screen"> 
         
         {/* Overlap & Bo góc */}
         {/* rounded-t-[3rem]: Bo góc cực lớn như iPhone display */}
         {/* Shadow cực lớn để tạo cảm giác nổi khối */}
         <div className="bg-white rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            

            {/* Product List */}
            <div className="pb-20 pt-4"> {/* Thêm pt-4 để tách khỏi filter bar một chút */}
               <Shop 
                 title={null} 
                 initialProducts={products} 
                 categories={categories}
               />
            </div>
         </div>

      </div>
    </main>
  );
}