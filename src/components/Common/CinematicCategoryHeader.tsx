// src/components/Common/AppleCategoryHeader.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

// --- Types ---
export interface SpecItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface QuickLink {
  label: string;
  url: string;
}

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface AppleCategoryHeaderProps {
  title: string;
  description?: string;
  image?: string;
  breadcrumbPages: BreadcrumbItem[];
  specs?: SpecItem[];
  quickLinks?: QuickLink[];
}

const AppleCategoryHeader = ({
  title,
  description,
  image,
  breadcrumbPages,
  specs,
  quickLinks,
}: AppleCategoryHeaderProps) => {

  // Dữ liệu giả lập (Fallback) chuẩn Apple Style
  const defaultSpecs: SpecItem[] = [
    { 
        label: "Công nghệ", 
        value: "Lõi PIR/PUR",
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    },
    { 
        label: "Bảo hành", 
        value: "10 Năm",
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    },
    { 
        label: "Tiêu chuẩn", 
        value: "ISO 9001",
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    },
    { 
        label: "Giao hàng", 
        value: "Toàn quốc",
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
    },
  ];

  const displaySpecs = specs || defaultSpecs;

  return (
    // Nền xám #F5F5F7 đặc trưng của Apple
    <section className="bg-[#F5F5F7] pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* --- CỘT TRÁI: NỘI DUNG & GRID --- */}
          <div className="flex-1 max-w-2xl">
            
            {/* Breadcrumb: Nhỏ, màu xám, font medium */}
            <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase text-[#86868B] mb-6">
              {breadcrumbPages.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-[#D2D2D7]">/</span>}
                  <Link 
                    href={item.url} 
                    className={`transition-colors hover:text-[#1D1D1F] ${index === breadcrumbPages.length - 1 ? "text-[#1D1D1F]" : ""}`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Tiêu đề: Đen đậm, tracking tight */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] mb-4 leading-[1.1]">
              {title}
            </h1>

            {/* Mô tả: Màu xám trung tính, dễ đọc */}
            <div className="text-lg text-[#424245] leading-relaxed mb-8 font-normal">
                {description ? (
                   <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                   <p>Giải pháp vật liệu xây dựng tiên tiến, được thiết kế để mang lại hiệu suất vượt trội và độ bền tối đa cho mọi công trình.</p>
                )}
            </div>

            {/* --- APPLE BENTO GRID (Thông số kỹ thuật) --- */}
            {/* Đây là điểm nhấn: Thông tin nhiều nhưng nhìn rất gọn và đẹp */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               {displaySpecs.map((spec, index) => (
                  <div key={index} className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col justify-between h-full border border-[#D2D2D7]/30">
                     <div className="mb-3 text-[#1D1D1F]">
                        {spec.icon}
                     </div>
                     <div>
                        <span className="block text-[10px] uppercase font-bold text-[#86868B] tracking-wider mb-1">{spec.label}</span>
                        <span className="block text-lg font-semibold text-[#1D1D1F] tracking-tight">{spec.value}</span>
                     </div>
                  </div>
               ))}
            </div>

            {/* Quick Links (Phân loại) - Dạng Pill */}
            {quickLinks && quickLinks.length > 0 && (
               <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-xs font-semibold text-[#86868B]">Khám phá:</span>
                  {quickLinks.map((link, index) => (
                     <Link 
                        key={index} 
                        href={link.url}
                        className="px-4 py-2 rounded-full bg-white border border-[#D2D2D7] text-sm font-medium text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] transition-all duration-300"
                     >
                        {link.label}
                     </Link>
                  ))}
               </div>
            )}
          </div>

          {/* --- CỘT PHẢI: HÌNH ẢNH (Floating Product) --- */}
          {/* Ảnh được đặt trong khung bo tròn lớn, đổ bóng mềm */}
          <div className="w-full lg:w-[45%] relative">
             <div className="relative aspect-square lg:aspect-[4/5] w-full">
                {/* Background trang trí sau ảnh */}
                <div className="absolute inset-4 bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.06)] transform rotate-2"></div>
                
                {/* Khung ảnh chính */}
                <div className="absolute inset-0 bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white z-10">
                   {image ? (
                      <Image
                         src={image}
                         alt={title}
                         fill
                         className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                         sizes="(max-width: 768px) 100vw, 500px"
                         priority
                      />
                   ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                         No Image
                      </div>
                   )}
                   
                   {/* Badge nổi kiểu Apple "New" */}
                   <div className="absolute top-6 left-6 z-20">
                      <span className="inline-block px-3 py-1 bg-[#1D1D1F] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                         Premium Choice
                      </span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppleCategoryHeader;