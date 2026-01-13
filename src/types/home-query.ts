// 1. Type chung cho Hình ảnh từ WPGraphQL
export interface WPImage {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

// 2. Type cho phần Hero Slider (Banner chính)
export interface HeroSection {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonUrl: string; // Trong ACF đặt tên là hero_button_url
  heroImage: WPImage;
}

// 3. Type cho phần Features (Ví dụ: Free Shipping, 24/7 Support)
// Dùng ACF Repeater
export interface FeatureItem {
  title: string;
  description: string;
  iconImage: WPImage; // Icon upload dạng ảnh
}

// 4. Type cho Promo Banner (Banner quảng cáo giữa trang)
export interface PromoSection {
  promoTitle: string;
  promoSubtitle: string;
  promoButtonText: string;
  promoLink: string;
  promoImage: WPImage;
}

// 5. Type cho Testimonials (Đánh giá khách hàng)
// Dùng ACF Repeater
export interface TestimonialItem {
  authorName: string;
  reviewText: string; // Nội dung đánh giá
  rating: number; // Số sao (1-5)
  authorImage: WPImage;
  designation?: string; // Chức vụ (CEO, Founder...)
}

// 6. Type cho Tiêu đề các Section (New Arrivals, Best Sellers...)
export interface SectionTitles {
  newArrivalsTitle: string;
  bestSellersTitle: string;
  categoriesTitle: string;
  blogTitle: string;
}

// 7. Tổng hợp tất cả các fields của trang Home
export interface HomePageFields {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonUrl: string;
  heroImage: WPImage;

  // Features (Repeater)
  featuresList: FeatureItem[];

  // Promo Banner
  promoTitle: string;
  promoSubtitle: string;
  promoButtonText: string;
  promoLink: string;
  promoImage: WPImage;

  // Testimonials (Repeater)
  testimonialsList: TestimonialItem[];

  // Section Titles
  newArrivalsTitle: string;
  bestSellersTitle: string;
  categoriesTitle: string;
}

// 8. Cấu trúc dữ liệu Sản phẩm từ WooCommerce (Để tái sử dụng)
export interface ProductNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  onSale: boolean;
  image: {
    sourceUrl: string;
    altText?: string;
  };
  price: string;
  regularPrice: string;
  salePrice: string;
  averageRating: number;
  reviewCount: number;
}

// ==========================================
// DATA TRẢ VỀ TỪ QUERY CHÍNH (Dùng cho page.tsx)
// ==========================================
export interface HomePageData {
  page: {
    seo: {
      title: string;
      metaDesc: string;
      opengraphImage: {
        sourceUrl: string;
      };
    };
    homePageFields: HomePageFields; // Dữ liệu từ ACF
  };
  // Dữ liệu sản phẩm từ WooCommerce
  newArrivals: {
    nodes: ProductNode[];
  };
  bestSellers: {
    nodes: ProductNode[];
  };
}