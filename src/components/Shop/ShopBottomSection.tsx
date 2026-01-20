"use client";
import React, { useState, useRef, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title?: string;
  content?: string;
  faqs?: FAQItem[];
}

// Brand Colors
const COLORS = {
  primary: "#5BA4E6",
  dark: "#0F3865",
  accent: "#38BDF8", // Cyan sáng để làm glow effect
};

const ShopBottomSection = ({ title, content, faqs }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc FAQ theo tìm kiếm (UX nâng cao)
  const filteredFaqs = faqs?.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden font-sans">
      
      {/* --- BACKGROUND: DYNAMIC MESH GRADIENT (Hiệu ứng nền sống động) --- */}
      <div className="absolute inset-0 w-full h-full bg-[#F8FAFC]">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-100/60 rounded-full blur-[80px] mix-blend-multiply opacity-60"></div>
        {/* Lưới Grid mờ tạo cảm giác kỹ thuật/xây dựng */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 xl:px-0 max-w-[1200px] relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0F3865] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#5BA4E6] animate-pulse"></span>
              Thông tin chuyên sâu
           </div>
           {title && (
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3865] tracking-tight leading-tight">
              {title}
            </h2>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --- LEFT COLUMN: THE "SMART READER" (8/12) --- */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            {/* Card chứa nội dung chính - Thiết kế kiểu "tờ báo hiện đại" */}
            <div className={`
                group relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)]
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden
                ${isExpanded ? "ring-2 ring-blue-100/50" : "hover:shadow-lg"}
            `}>
              
              {/* Trang trí Header của Card */}
              <div className="h-2 w-full bg-gradient-to-r from-[#0F3865] via-[#5BA4E6] to-[#0F3865]"></div>

              <div className="p-8 md:p-10">
                <div 
                  className={`
                    prose prose-lg max-w-none text-slate-600
                    prose-headings:font-bold prose-headings:text-[#0F3865] prose-headings:tracking-tight
                    prose-p:leading-8 prose-img:rounded-2xl prose-img:shadow-md
                    prose-a:text-[#5BA4E6] prose-a:font-semibold
                    /* Highlight style */
                    prose-mark:bg-gradient-to-r prose-mark:from-blue-50 prose-mark:to-transparent prose-mark:text-[#0F3865] prose-mark:px-1 prose-mark:py-0.5 prose-mark:rounded
                    transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isExpanded ? "max-h-full opacity-100" : "max-h-[400px] mask-image-gradient-b"}
                  `}
                >
                   <div dangerouslySetInnerHTML={{ __html: content || "" }} />
                </div>
              </div>

              {/* Action Bar (Thanh điều khiển) */}
              <div className={`
                absolute bottom-0 inset-x-0 pt-32 pb-8 flex justify-center bg-gradient-to-t from-white via-white/95 to-transparent z-20 transition-all duration-500
                ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}>
                 <button 
                  onClick={() => setIsExpanded(true)}
                  className="relative group/btn overflow-hidden rounded-full bg-[#0F3865] text-white px-8 py-4 font-semibold shadow-xl shadow-blue-900/20 transition-all hover:scale-105 active:scale-95"
                 >
                    <span className="relative z-10 flex items-center gap-2">
                      Mở rộng nội dung
                      <svg className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" /></svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F3865] to-[#2563EB] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                 </button>
              </div>

              {/* Nút thu gọn (Khi đã mở) */}
              {isExpanded && (
                <div className="sticky bottom-4 flex justify-center z-30 pointer-events-none">
                   <button 
                    onClick={() => {
                        setIsExpanded(false);
                        // Optional: Scroll back to top of section
                    }}
                    className="pointer-events-auto bg-white/90 backdrop-blur border border-slate-200 text-[#0F3865] px-6 py-2 rounded-full shadow-lg text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                   >
                      Thu gọn
                      <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" /></svg>
                   </button>
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: INTERACTIVE FAQ (4/12) --- */}
          {faqs && faqs.length > 0 && (
            <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
              
              <div className="bg-white rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden flex flex-col max-h-[80vh]">
                
                {/* Header FAQ với Search Bar */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xl font-bold text-[#0F3865] mb-4">Câu hỏi thường gặp</h3>
                  <div className="relative group focus-within:ring-2 ring-blue-100 rounded-xl transition-all">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#5BA4E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                      type="text" 
                      placeholder="Tìm câu hỏi..." 
                      className="w-full bg-white border-none text-sm py-3 pl-10 pr-4 rounded-xl shadow-sm placeholder-slate-400 text-slate-700 outline-none"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* FAQ List Scrollable */}
                <div className="overflow-y-auto p-4 space-y-2 custom-scrollbar">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className={`rounded-xl transition-all duration-300 ${isOpen ? "bg-blue-50/50" : "hover:bg-slate-50"}`}>
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full text-left p-4 flex items-start gap-3 group"
                          >
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${isOpen ? "bg-[#5BA4E6]" : "bg-slate-300 group-hover:bg-[#5BA4E6]"}`}></span>
                            <div className="flex-1">
                                <span className={`text-[15px] font-semibold transition-colors block mb-1 ${isOpen ? "text-[#0F3865]" : "text-slate-700"}`}>
                                  {faq.question}
                                </span>
                                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                  <div className="overflow-hidden">
                                    <p className="text-sm text-slate-500 leading-relaxed mt-2">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                            </div>
                          </button>
                        </div>
                      );
                    })
                  ) : (
                     <div className="p-8 text-center text-slate-400 text-sm">
                        Không tìm thấy câu hỏi nào.
                     </div>
                  )}
                </div>

                {/* Footer CTA */}
                <div className="p-4 border-t border-slate-100 bg-[#0F3865] text-white">
                    <a href="#" className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-5 h-5 text-[#5BA4E6]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-blue-200 uppercase font-bold">Liên hệ tư vấn</p>
                                <p className="text-sm font-bold">09x.xxx.xxxx</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Styles for scrollbar & masks */}
      <style jsx>{`
        .mask-image-gradient-b {
          mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
};

export default ShopBottomSection;