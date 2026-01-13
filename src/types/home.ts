// src/types/home.ts

// Định nghĩa chung cho ảnh từ WPGraphQL
export interface WPImage {
  sourceUrl: string;
  altText: string;
}

// Định nghĩa Node ảnh (vì WP trả về dạng { node: { sourceUrl... } })
export interface WPImageNode {
  node: WPImage;
}

export interface HomePageData {
  page: {
    seo: {
      title: string;
      description: string;
      openGraph: {
        image: { url: string };
      };
    };
    homePageFields: {
      heroTitle: string;
      heroSubtitle: string;
      heroButtonText: string;
      heroButtonUrl: string;
      heroImage: WPImageNode; // Lưu ý: Single image dùng node, Gallery dùng nodes
      featuresList: Array<{
        title: string;
        description: string;
        iconImage: WPImageNode;
      }>;
      // ... các field khác tương tự
    };
  };
  newArrivals: {
    nodes: any[]; // Bạn có thể định nghĩa kỹ hơn interface Product sau
  };
  bestSellers: {
    nodes: any[];
  };
}