// src/types/home-query.ts

// 1. SỬA LẠI: Định nghĩa kiểu Edge (Một node duy nhất)
export interface WPImageEdge {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

// 2. Định nghĩa các Field trong ACF
export interface HomePageFields {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonUrl: string;
  heroImage: WPImageEdge; // Dùng kiểu Edge mới

  // Features
  featuresList: {
    title: string;
    description: string;
    iconImage: WPImageEdge;
  }[];

  // Promo
  promoTitle: string;
  promoSubtitle: string;
  promoButtonText: string;
  promoLink: string;
  promoImage: WPImageEdge;

  // Testimonials
  testimonialsList: {
    authorName: string;
    reviewText: string;
    rating: number;
    authorImage: WPImageEdge;
  }[];

  // Titles
  newArrivalsTitle: string;
  bestSellersTitle: string;
}

export interface HomePageData {
  page: {
    seo: {
      title: string;
      description: string;
      openGraph: {
        image: {
          url: string;
        };
      };
    };
    homePageFields: HomePageFields;
  };
  newArrivals: { nodes: any[] };
  bestSellers: { nodes: any[] };
}