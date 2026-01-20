import React from "react";
import ModernCategoryHeader from "@/components/Common/ModernCategoryHeader";

// Import các Icon SVG chuẩn
const Icons: Record<string, React.ReactNode> = {
  verify: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 6.45l-3.25 3.5a.75.75 0 11-1.1-1.02l3.25-3.5a.75.75 0 011.1 1.02zM12 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /><path d="M9.657 15.899l5.47-6.606a.75.75 0 10-1.154-.966l-4.8 5.798-2.35-2.035a.75.75 0 00-.986 1.14l2.95 2.553a.75.75 0 001.07-.084z" /></svg>,
  speed: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  refresh: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>,
  star: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>,
  shield: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
};

interface Props {
  categoryData: any;
  productsCount: number;
  breadcrumbData: any[];
  children: React.ReactNode;
}

const CategoryParallaxLayout = ({ 
  categoryData, 
  productsCount, 
  breadcrumbData, 
  children 
}: Props) => {
  
  // Lấy dữ liệu ACF (đã an toàn nhờ API trả về đúng)
  const acf = categoryData?.productCategorySettings || {};
  
  // 1. Slogan: Ưu tiên ACF -> Fallback
  const slogan = acf.cinematicSlogan || `Đỉnh cao chất lượng ${categoryData.name}`;
  
  // 2. Mô tả: Ưu tiên Core -> ACF
  const description = categoryData.description || acf.customDescription || `Khám phá danh mục ${categoryData.name} chính hãng.`;

  // 3. Features: Map từ Repeater ACF -> Icon Component
  let features = [];
  if (acf.headerFeatures && Array.isArray(acf.headerFeatures) && acf.headerFeatures.length > 0) {
    features = acf.headerFeatures.map((item: any) => ({
      label: item.label,
      subLabel: item.subLabel,
      icon: Icons[item.icon] || Icons['verify'], // Nếu chọn icon lạ thì fallback về verify
    }));
  }

  return (
    <main className="bg-gray-50 min-h-screen relative selection:bg-blue-500 selection:text-white">
      
      {/* HEADER STICKY */}
      <div className="sticky top-0 z-0 w-full">
        <ModernCategoryHeader
          title={categoryData.name}
          subtitle={slogan}
          description={description}
          image={categoryData.image?.sourceUrl}
          breadcrumbPages={breadcrumbData}
          totalProducts={productsCount}
          features={features.length > 0 ? features : undefined}
        />
        {/* Gradient Fade */}
        <div className="h-24 w-full bg-gradient-to-b from-white to-transparent absolute bottom-[-90px] left-0"></div>
      </div>

      {/* CONTENT SCROLLABLE */}
      <div className="relative z-10 -mt-8">
        <div className="shadow-[0px_-10px_40px_rgba(0,0,0,0.08)] border-t border-white/50 min-h-screen overflow-hidden rounded-t-[2.5rem]">
          <div className="relative z-10 bg-white min-h-screen">
            <div className="bg-white overflow-hidden">
              
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full"></div>
              </div>

              <div className="pb-20 pt-4">
                {children}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryParallaxLayout;