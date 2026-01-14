// src/app/(site)/layout.tsx
import "../css/style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../css/euclid-circular-a-font.css";
import { Providers } from "../providers"; // Import file vừa tạo ở Bước 1


// Import các Client Component
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader"; // Nếu bạn vẫn muốn giữ preloader (tùy chọn)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <Header />
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