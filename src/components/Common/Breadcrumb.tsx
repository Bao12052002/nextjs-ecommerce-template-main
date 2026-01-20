import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  pages: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ pages = [], className = "" }: BreadcrumbProps) => {
  // 1. Tạo cấu trúc dữ liệu Schema SEO (JSON-LD)
  // Giúp Google hiển thị đường dẫn đẹp trên kết quả tìm kiếm
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": pages.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://khopanel.com'}${item.path}`
    }))
  };

  return (
    <>
      {/* Inject JSON-LD cho SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center flex-wrap gap-1 md:gap-2 text-sm md:text-[12px]">
          {pages.map((item, index) => {
            // Logic xác định trang hiện tại (phần tử cuối cùng)
            const isLast = index === pages.length - 1;

            return (
              <li key={index} className="flex items-center">
                
                {/* Dấu ngăn cách (Separator) - Bỏ qua cho phần tử đầu tiên */}
                {index > 0 && (
                  <span className="mx-2 text-slate-300 dark:text-slate-600 select-none">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}

                {/* Nội dung Link */}
                {isLast ? (
                  // TRANG HIỆN TẠI: Đậm hơn, không click được (Tạo điểm nhấn phân cấp)
                  <span 
                    className="font-semibold text-slate-800 dark:text-white truncate max-w-[200px] md:max-w-none" 
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  // CÁC TRANG CHA: Nhạt hơn, có hover (Tạo cảm giác đường dẫn)
                  <Link 
                    href={item.path}
                    className="text-slate-500 hover:text-blue-600 transition-colors font-medium dark:text-slate-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;