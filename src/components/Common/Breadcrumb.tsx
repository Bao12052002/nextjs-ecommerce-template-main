// src/components/Common/Breadcrumb.tsx
import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  url: string; // Đảm bảo dữ liệu đầu vào có thuộc tính này
}

interface BreadcrumbProps {
  pages: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ pages, className = "" }: BreadcrumbProps) => {
  return (
    <nav className={`flex items-center text-sm text-dark-4 ${className}`}>
      {pages.map((item, index) => (
        <div key={index} className="flex items-center">
          {/* Mũi tên ngăn cách */}
          {index > 0 && (
            <span className="mx-2 text-gray-4">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}

          {/* Logic hiển thị */}
          {index === pages.length - 1 ? (
             // Phần tử cuối cùng: Luôn là text
            <span className="font-medium text-blue">{item.label}</span>
          ) : (
             // Các phần tử trước đó: Kiểm tra nếu có URL thì Link, không thì Span
             item.url ? (
                <Link href={item.url} className="hover:text-blue transition-colors duration-200">
                  {item.label}
                </Link>
             ) : (
                <span className="text-dark-4">{item.label}</span>
             )
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;