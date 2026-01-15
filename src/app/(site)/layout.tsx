// src/app/(site)/layout.tsx
import "../css/style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../css/euclid-circular-a-font.css";
import { Providers } from "../providers"; 
import { getMenuByLocation, getHeaderLogo } from "@/lib/fetchAPI";

// Import các Client Component
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader"; // Nếu bạn vẫn muốn giữ preloader (tùy chọn)


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuByLocation("PRIMARY");
  // 2. Lấy Logo (Thêm dòng này)
  const logoUrl = await getHeaderLogo();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <Header menuData={menuItems} logoUrl={logoUrl}/>
          {children}
          
          {/* Các Modal toàn cục đặt ở đây */}
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

