"use client";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title?: string;
  content?: string;
  faqs?: FAQItem[];
}

// BẢNG MÀU THƯƠNG HIỆU
const BRAND = {
  navy: "#0F3865",
  blue: "#5BA4E6",
  bg_section: "#FFFFFF", // Đặt nền trắng tuyệt đối cho phần này để nổi bật trên nền xám của Shop
};

const ShopBottomSection = ({ title, content, faqs }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (!content && (!faqs || faqs.length === 0)) return null;

  return (
    <div className="relative z-20">
      
      {/* --- CẦU NỐI THỊ GIÁC (THE BRIDGE) --- */}
      {/* Phần này nằm đè lên ranh giới giữa 2 section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="bg-white p-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F3865] to-[#5BA4E6] flex items-center justify-center text-white animate-pulse-slow">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
           </div>
        </div>
      </div>

      <section 
        className="relative pt-20 pb-24 mt-12 rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)] border-t border-slate-50 "
        style={{ backgroundColor: BRAND.bg_section }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        
        {/* Hiệu ứng nền mờ nhẹ nhàng */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-[3rem] pointer-events-none">
           <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px]"></div>
           <div className="absolute top-[-5%] right-[5%] w-[300px] h-[300px] bg-[#0F3865]/5 rounded-full blur-[80px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-[1170px]">
          
          {/* Header nhỏ dẫn dắt (Optional) */}
          <div className="text-center mb-12">
             <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-[#0F3865] text-xs font-bold uppercase tracking-widest mb-2 border border-slate-200">
                Thông tin chuyên sâu
             </span>
             {title && (
               <h2 className="text-3xl md:text-4xl font-bold text-[#0F3865] mt-2">
                 {title}
               </h2>
             )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* --- LEFT: ARTICLE CARD --- */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 relative group transition-shadow hover:shadow-md">
                
                {/* Content */}
                <div 
                  className={`
                    prose prose-lg max-w-none text-slate-600
                    prose-headings:font-bold prose-headings:text-[#0F3865]
                    prose-p:leading-8
                    prose-a:text-[#5BA4E6] prose-a:font-semibold prose-a:no-underline
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-mark:bg-blue-50 prose-mark:text-[#0F3865] prose-mark:rounded
                    transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isExpanded ? "max-h-full pb-8" : "max-h-[350px] overflow-hidden"}
                  `}
                >
                   <div dangerouslySetInnerHTML={{ __html: content || "" }} />
                </div>

                {/* Fade Overlay */}
                {!isExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-8 rounded-b-[2rem]">
                     <button 
                      onClick={() => setIsExpanded(true)}
                      className="relative overflow-hidden group/btn flex items-center gap-3 pl-6 pr-5 py-3 rounded-full bg-[#0F3865] text-white font-semibold shadow-lg hover:shadow-blue-900/30 transition-all hover:-translate-y-1"
                     >
                        <span className="relative z-10">Đọc toàn bộ</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3865] to-[#5BA4E6] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <svg className="w-4 h-4 relative z-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" /></svg>
                     </button>
                  </div>
                )}
                
                {isExpanded && (
                  <div className="flex justify-center mt-6 pt-6 border-t border-dashed border-slate-100">
                      <button onClick={() => setIsExpanded(false)} className="text-[#5BA4E6] hover:text-[#0F3865] text-sm font-bold flex items-center gap-2">
                        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" /></svg>
                        Thu gọn
                      </button>
                  </div>
                )}
              </div>
            </div>

            {/* --- RIGHT: FAQ & CTA --- */}
            {faqs && faqs.length > 0 && (
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
                
                {/* FAQ Box: Minimalist Style */}
                <div className="bg-[#F8FAFC] rounded-[2rem] p-1 border border-slate-100">
                  <div className="bg-white rounded-[1.8rem] shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-50 flex items-center gap-3">
                       <span className="w-8 h-8 rounded-full bg-blue-50 text-[#5BA4E6] flex items-center justify-center font-bold text-lg">?</span>
                       <h3 className="font-bold text-[#0F3865]">Hỏi đáp nhanh</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="group/faq">
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full py-4 px-5 text-left flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors"
                          >
                            <span className={`text-[14px] font-semibold transition-colors ${openFaqIndex === idx ? "text-[#5BA4E6]" : "text-slate-700 group-hover/faq:text-[#0F3865]"}`}>
                              {faq.question}
                            </span>
                            <span className={`flex-shrink-0 transition-transform duration-300 ${openFaqIndex === idx ? "rotate-180 text-[#5BA4E6]" : "text-slate-300"}`}>
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </span>
                          </button>
                          <div className={`grid transition-all duration-300 ${openFaqIndex === idx ? "grid-rows-[1fr] pb-4 px-5" : "grid-rows-[0fr] px-5"}`}>
                             <div className="overflow-hidden">
                               <p className="text-[13px] text-slate-500 leading-relaxed">{faq.answer}</p>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Card: Điểm nhấn màu sắc */}
                <div className="group relative overflow-hidden rounded-[2rem] shadow-lg cursor-pointer">
                   <div className="absolute inset-0 bg-[#0F3865] transition-colors duration-300 group-hover:bg-[#0b2a4d]"></div>
                   <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#5BA4E6] rounded-full blur-[40px] opacity-50 group-hover:opacity-70 transition-opacity"></div>
                   
                   <div className="relative z-10 p-6 flex items-center justify-between">
                      <div>
                         <p className="text-[#5BA4E6] text-[10px] font-bold uppercase tracking-widest mb-1">Hỗ trợ kỹ thuật</p>
                         <p className="text-white font-bold text-lg leading-tight">Liên hệ Zalo<br/>Chuyên gia</p>
                      </div>
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </div>
                   </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopBottomSection;