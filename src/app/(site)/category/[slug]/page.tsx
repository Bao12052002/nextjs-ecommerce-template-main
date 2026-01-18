import React from "react";
import Shop from "@/components/Shop/"; 
import { getProducts, getCategories, getCategoryBySlug } from "@/lib/fetchAPI";
import { notFound } from "next/navigation";
import ModernCategoryHeader from "@/components/Common/ModernCategoryHeader"; // Component UX mới
import { Metadata } from "next";

// --- 1. HÀM TẠO SLOGAN (Cinematic Copy) ---
const getCinematicCopy = (categoryName: string) => {
  const mapping: Record<string, string> = {
    "Panel Cách Nhiệt": "Vững chãi. Cách nhiệt tối ưu.",
    "Panel Cách Nhiệt PU": "Vững chãi. Cách nhiệt tối ưu.",
    "Panel EPS": "Nhẹ nhàng. Kinh tế. Hiệu quả.",
    "Phụ kiện": "Chi tiết nhỏ. Hoàn thiện lớn.",
  };
  return mapping[categoryName] || `Đỉnh cao chất lượng ${categoryName}`;
};

// --- 2. HÀM MÔ TẢ MẶC ĐỊNH ---
const getDefaultDescription = (name: string) => {
  if (name.toLowerCase().includes('panel') || name.toLowerCase().includes('cách nhiệt')) {
    return "Tấm panel cách nhiệt (Sandwich Panel) là vật liệu xây dựng 3 lớp gồm 2 mặt tôn và lớp lõi xốp (PU, EPS, XPS, Rockwool, Glasswool...), dùng làm vách, trần, mái nhà, có khả năng cách nhiệt, cách âm, chống cháy hiệu quả, thi công nhanh chóng, tiết kiệm chi phí cho các công trình hiện đại như nhà xưởng, nhà ở, kho lạnh.";
  }
  return `Khám phá danh mục ${name} với các sản phẩm chất lượng cao, chính hãng và giá thành tốt nhất thị trường.`;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getCategoryBySlug(slug);
  return {
    title: categoryData ? `${categoryData.name} | Tổng Kho Panel` : "Danh mục",
    description: categoryData?.description || "Chuyên cung cấp vật liệu cách nhiệt chính hãng.",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // Parallel Fetching
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
    { label: "Cửa hàng", url: "/shop" },
    { label: categoryData.name, url: `/category/${categoryData.slug}` },
  ];

  const slogan = getCinematicCopy(categoryData.name);
  const finalDescription = categoryData.description || getDefaultDescription(categoryData.name);

  return (
    // Dùng bg-gray-50 để làm nền nền tảng, tạo sự tách biệt nhẹ khi cuộn
    <main className="bg-gray-50 min-h-screen relative"> 
      
      {/* --- LAYER 1: STICKY HEADER --- */}
      {/* sticky top-0: Dính trên đỉnh
          z-0: Nằm lớp dưới cùng
          h-screen: Chiếm chiều cao màn hình để tạo khoảng trống cho hiệu ứng parallax 
          (Hoặc để auto nếu muốn header cuộn đi một chút rồi mới bị che)
      */}
      <div className="sticky top-0 z-0 w-full"> 
        <ModernCategoryHeader 
            title={categoryData.name}
            subtitle={slogan}
            description={finalDescription}
            image={categoryData.image?.sourceUrl}
            breadcrumbPages={breadcrumbData}
            totalProducts={products?.length || 0}
        />
        {/* Một lớp gradient mờ bên dưới header để làm mềm phần chuyển tiếp nếu màn hình quá dài */}
        <div className="h-24 w-full bg-gradient-to-b from-white to-transparent absolute bottom-[-90px] left-0"></div>
      </div>

      {/* --- LAYER 2: SHOP CONTENT (SCROLLABLE OVERLAY) --- */}
      {/* relative z-10: Nổi lên trên header
          margin-top: Tạo khoảng trống ban đầu để nhìn thấy header trọn vẹn
      */}
      <div className="relative z-10 -mt-8"> 
        
        {/* HIỆU ỨNG THẺ NỔI (CARD EFFECT) */}
        {/* rounded-t-[2.5rem]: Bo góc trên lớn (Apple style)
            shadow-[...]: Bóng đổ lớn nhưng mờ nhẹ (không đen kịt) để tạo độ nổi 3D
            bg-white: Nền trắng che header phía sau
            min-h-screen: Đảm bảo kéo dài hết trang
        */}
        <div className="0px_rgba(0,0,0,0.08)] border-t border-white/50 min-h-screen overflow-hidden">
          
           <div className="relative z-10 bg-white min-h-screen"> 
         
         {/* Overlap & Bo góc */}
         {/* rounded-t-[3rem]: Bo góc cực lớn như iPhone display */}
         {/* Shadow cực lớn để tạo cảm giác nổi khối */}
         <div className="bg-white overflow-hidden">
            

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
        </div>

      </div>
    </main>
  );
}