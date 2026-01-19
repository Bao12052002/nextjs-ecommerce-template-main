// src/app/(site)/layout.tsx
import "../css/style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import "../css/euclid-circular-a-font.css"; // 1. Xóa hoặc comment dòng này
import { Providers } from "../providers"; 
import { getMenuByLocation, getHeaderLogo } from "@/lib/fetchAPI";
import { Be_Vietnam_Pro } from "next/font/google"; // 2. Import font từ Google

// Import các Client Component
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

// 3. Cấu hình font
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"], // Chọn các độ đậm bạn cần
  display: "swap",
  variable: "--font-be-vietnam-pro", // (Tùy chọn) Nếu muốn dùng biến CSS
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuByLocation("PRIMARY");
  const logoUrl = await getHeaderLogo();
  
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* 4. Thêm className của font vào body */}
      <body suppressHydrationWarning={true} className={`${beVietnamPro.className}`}>
        <Providers>
          <Header menuData={menuItems} logoUrl={logoUrl}/>
          {children}
          
          <QuickViewModal />
          <CartSidebarModal />
          <PreviewSliderModal />
        </Providers>
        
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}