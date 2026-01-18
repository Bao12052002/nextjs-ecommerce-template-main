import React from "react";
import Image from "next/image";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";

interface CategoryHeaderProps {
  title: string;
  description?: string;
  image?: string;
  breadcrumbPages: BreadcrumbItem[];
}

const CategoryHeader = ({
  title,
  description,
  image,
  breadcrumbPages,
}: CategoryHeaderProps) => {
  return (
    // Padding-top giữ nguyên để tránh Header che, nhưng padding-bottom giảm đi
    <section className="pt-32 pb-6 lg:pt-40 lg:pb-8 bg-gray-50">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        
        {/* KHỐI CONTAINER CHÍNH: Dạng thẻ trắng, có viền, bóng nhẹ, không gradient lòe loẹt */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* --- PHẦN 1: NỘI DUNG (Chiếm 70-75% chiều ngang) --- */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              
              {/* Breadcrumb nhỏ gọn phía trên */}
              <div className="mb-4">
                 <Breadcrumb pages={breadcrumbPages} className="text-xs text-gray-500" />
              </div>

              {/* Tiêu đề & Mô tả */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  {title}
                </h1>
                
                {description && (
                  <div 
                    className="text-sm text-gray-600 leading-relaxed max-w-3xl line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: description }} 
                  />
                )}
              </div>

              {/* --- KHU VỰC TRUST BADGES (Tăng độ tin cậy) --- */}
              {/* Đây là phần "Thông tin thêm" bạn yêu cầu */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                {/* Badge 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue/10 flex items-center justify-center text-blue shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Cam kết</span>
                    <span className="text-xs font-bold text-gray-800">Chính hãng 100%</span>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Vận chuyển</span>
                    <span className="text-xs font-bold text-gray-800">Toàn quốc</span>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Hỗ trợ</span>
                    <span className="text-xs font-bold text-gray-800">Tư vấn 24/7</span>
                  </div>
                </div>
                
                 {/* Badge 4 - Số lượng sản phẩm (Nếu muốn dynamic thì cần truyền props, tạm thời để tĩnh hoặc ẩn) */}
                 <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Kho hàng</span>
                    <span className="text-xs font-bold text-gray-800">Sẵn hàng</span>
                  </div>
                </div>

              </div>
            </div>

            {/* --- PHẦN 2: HÌNH ẢNH (Chiếm 25-30% - Nằm gọn bên phải) --- */}
            {image && (
              <div className="relative w-full md:w-1/3 lg:w-1/4 h-48 md:h-auto shrink-0 border-l border-gray-100">
                 {/* Ảnh không tràn viền, nằm gọn gàng */}
                 <div className="absolute inset-0 bg-gray-100">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 30vw"
                      priority
                    />
                    {/* Overlay tối nhẹ để phân tách biên ảnh nếu ảnh là màu trắng */}
                    <div className="absolute inset-0 border-l border-gray-200/50 pointer-events-none"></div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeader;