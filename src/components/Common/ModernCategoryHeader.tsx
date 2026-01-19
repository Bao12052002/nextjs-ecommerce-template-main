import React from "react";
import Image from "next/image";
import Link from "next/link";

// --- ICONS SVG (Bộ icon Clean & Minimalist) ---
const VerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 6.45l-3.25 3.5a.75.75 0 11-1.1-1.02l3.25-3.5a.75.75 0 011.1 1.02zM12 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    <path d="M9.657 15.899l5.47-6.606a.75.75 0 10-1.154-.966l-4.8 5.798-2.35-2.035a.75.75 0 00-.986 1.14l2.95 2.553a.75.75 0 001.07-.084z" />
  </svg>
);

const SpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

interface BreadcrumbItem {
  label: string;
  url: string;
}

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
  breadcrumbPages: BreadcrumbItem[];
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

  // Default Features với Icon và màu sắc chuẩn UX
  const defaultFeatures: FeatureItem[] = [
    { label: "Chính hãng", subLabel: "100% Auth", icon: <VerifyIcon /> },
    { label: "Giao nhanh", subLabel: "2h nội thành", icon: <SpeedIcon /> },
    { label: "Đổi trả", subLabel: "30 ngày", icon: <RefreshIcon /> },
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <section className="bg-white pt-32 pb-12 border-b border-slate-100">
      <div className="container mx-auto px-4 xl:px-0 max-w-[1200px]">
        
        {/* 1. Breadcrumb - Tinh tế, font nhỏ */}
        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-8">
            {breadcrumbPages.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-slate-200">/</span>}
                <Link 
                  href={item.url} 
                  className={`hover:text-blue-600 transition-colors duration-200 ${index === breadcrumbPages.length - 1 ? 'text-slate-800' : ''}`}
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
        </nav>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 xl:gap-20">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="flex-1 w-full text-left">
            
            {/* Title Block */}
            <div className="mb-6">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1d1d1f] tracking-tight mb-3 leading-[1.1]">
                 {title}
               </h1>
               
               {/* Slogan - Màu xanh đậm tạo điểm nhấn tin cậy */}
               {subtitle && (
                 <p className="text-xl md:text-2xl text-[#0066CC] font-semibold tracking-tight">
                   {subtitle}
                 </p>
               )}
            </div>

            {/* Description - Font dễ đọc, màu xám trung tính */}
            <div className="text-[15px] md:text-base text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium">
               {description}
            </div>

            {/* --- INFO BAR (UX Upgrade) --- */}
            {/* Phân tách rõ ràng bằng border, layout thoáng */}
            <div className="flex flex-wrap items-center gap-y-6 gap-x-8 md:gap-x-12 py-6 border-t border-slate-100">
               
               {/* Stats: Total Items */}
               <div className="flex items-center gap-3 pr-8 md:border-r border-slate-100">
                  <span className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                    {totalProducts}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total</span>
                    <span className="text-xs font-semibold text-slate-600">Sản phẩm</span>
                  </div>
               </div>

               {/* Features Loop */}
               <div className="flex flex-wrap gap-8">
                 {displayFeatures.map((feat, idx) => (
                   <div key={idx} className="flex items-center gap-3 group cursor-default">
                      <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                        {feat.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider mb-0.5">
                          {feat.label}
                        </span>
                        <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                          {feat.subLabel}
                        </span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: HERO IMAGE (3D Floating Effect) --- */}
          <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0">
            <div className="relative w-full aspect-[4/3] group perspective-1000">
               
               {/* Background Glow trang trí (Subtle) */}
               <div className="absolute inset-4 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-[2rem] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

               {/* Main Image Container */}
               <div className="relative w-full h-full">
                 {image ? (
                   <Image 
                     src={image} 
                     alt={title} 
                     fill 
                     // Object contain để thấy trọn vẹn sản phẩm panel
                     className="object-contain drop-shadow-2xl transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                     sizes="(max-width: 768px) 100vw, 500px"
                     priority
                   />
                 ) : (
                   <div className="w-full h-full bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-100">
                     No Image
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