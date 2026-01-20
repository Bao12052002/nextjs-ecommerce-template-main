import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";

// --- 1. ICONS (Đã đổi màu sang Xanh #0d497c) ---
const VerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0d497c]">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 6.45l-3.25 3.5a.75.75 0 11-1.1-1.02l3.25-3.5a.75.75 0 011.1 1.02zM12 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    <path d="M9.657 15.899l5.47-6.606a.75.75 0 10-1.154-.966l-4.8 5.798-2.35-2.035a.75.75 0 00-.986 1.14l2.95 2.553a.75.75 0 001.07-.084z" />
  </svg>
);

const SpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0d497c]">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0d497c]">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

interface FeatureItem {
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
}

interface ModernCategoryHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  breadcrumbPages: { label: string; path: string }[];
  totalProducts?: number;
  features?: FeatureItem[];
}

const ModernCategoryHeader = ({
  title,
  subtitle,
  description,
  image,
  breadcrumbPages,
  totalProducts = 0,
  features,
}: ModernCategoryHeaderProps) => {

  const defaultFeatures: FeatureItem[] = [
    { label: "Chính hãng", subLabel: "100% Auth", icon: <VerifyIcon /> },
    { label: "Giao nhanh", subLabel: "2h nội thành", icon: <SpeedIcon /> },
    { label: "Đổi trả", subLabel: "30 ngày", icon: <RefreshIcon /> },
  ];

  const displayFeatures = features && features.length > 0 ? features : defaultFeatures;

  return (
    <section className="bg-white pt-28 md:pt-50 pb-22 border-b border-gray-100 relative overflow-hidden">
      
      {/* Background Decor (Màu Brand nhạt) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-[#0d497c]/5 blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-[#FFB700]/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 xl:px-0 max-w-[1170px] relative z-10">
        
        {/* Breadcrumb: Nhỏ gọn, màu xám trung tính */}
        <div className="flex justify-center md:justify-start mb-5">
             <div className="[&>nav]:text-gray-500 [&>nav_a]:text-gray-500 [&>nav_a:hover]:text-[#0d497c] [&>nav_span]:text-gray-400 font-medium text-xs tracking-wide">
                <Breadcrumb pages={breadcrumbPages} />
             </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 xl:gap-16">
          
          {/* --- LEFT CONTENT --- */}
          <div className="flex-1 w-full text-left order-2 lg:order-1">
            
           

            {/* 2. Title (Màu Xanh Đậm #0d497c - Font size vừa phải) */}
            {/* Giảm từ 6xl xuống 5xl/4xl để tránh vỡ layout với tiếng Việt */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0d497c] tracking-tight mb-4 leading-tight">
              {title}
            </h1>
             {/* 1. Slogan (Màu Vàng Cam #FFB700 - Tạo điểm nhấn) */}
            {subtitle && (
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[2px] w-6 bg-[#FFA131]"></span>
                <span className="text-sm md:text-base font-bold text-[#FFA131] uppercase tracking-wider">
                  {subtitle}
                </span>
              </div>
            )}
            {/* 3. Description (Gọn gàng) */}
            <div className="text-base text-slate-500 leading-relaxed mb-10 max-w-2xl font-normal border-l-4 border-slate-100 pl-4">
               {description}
            </div>

            {/* --- INFO BAR (Clean Style) --- */}
            <div className="flex flex-wrap items-center gap-y-4 gap-x-6 md:gap-x-10 py-5 border-t border-dashed border-gray-200">
               
               {/* Stats */}
               <div className="flex items-center gap-3 pr-6 md:border-r border-gray-200">
                  <span className="text-2xl font-bold text-[#0d497c]">
                    {totalProducts}
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="text-[9px] font-bold uppercase text-gray-400">Total</span>
                    <span className="text-[11px] font-semibold text-gray-600">Products</span>
                  </div>
               </div>

               {/* Features Icons */}
               <div className="flex flex-wrap gap-4 md:gap-6">
                 {displayFeatures.map((feat, idx) => (
                   <div key={idx} className="flex items-center gap-2 group cursor-default">
                      {/* Icon Box: Nền xanh nhạt, Icon xanh đậm */}
                      <div className="p-1.5 bg-[#0d497c]/5 rounded-md group-hover:bg-[#0d497c]/10 transition-colors duration-300">
                        {feat.icon || <VerifyIcon />}
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[8px] uppercase text-gray-400 font-bold tracking-wider">
                          {feat.label}
                        </span>
                        {/* SubLabel: Màu xanh đậm khi hover */}
                        <span className="text-xs font-bold text-gray-700 group-hover:text-[#0d497c] transition-colors">
                          {feat.subLabel}
                        </span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* --- RIGHT IMAGE (Compact & Elegant) --- */}
          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] group perspective-1000">
               
               {/* Decorative Border (Viền mỏng màu vàng) */}
               <div className="absolute inset-0 border-2 border-[#FFB700]/20 rounded-[1.5rem] transform rotate-3 scale-95 z-0 transition-transform duration-500 group-hover:rotate-6"></div>
               
               {/* Main Container */}
               <div className="relative w-full h-full z-10 bg-white rounded-[1.5rem] shadow-lg border border-gray-100 overflow-hidden">
                 {image ? (
                   <Image 
                     src={image} 
                     alt={title} 
                     fill 
                     className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                     sizes="(max-width: 768px) 100vw, 450px"
                     priority
                   />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                     <span className="text-xs font-medium">No Image</span>
                   </div>
                 )}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ModernCategoryHeader;