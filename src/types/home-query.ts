export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface ProductNode {
  id: string;
  name: string;
  slug: string;
  image: WPImage;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  onSale?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export interface TestimonialItem {
  authorName: string;
  reviewText: string;
  rating: number;
  authorImage: { node: WPImage };
}

export interface HomePageFields {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonUrl: string;
  heroImage: { node: WPImage };
  
  // Promo
  promoTitle: string;
  promoSubtitle: string;
  promoButtonText: string;
  promoLink: string;
  promoImage: { node: WPImage };

  // Testimonials
  testimonialsList: TestimonialItem[];
  
  // Titles
  newArrivalsTitle: string;
  bestSellersTitle: string;
}

export interface HomePageData {
  page: {
    homePageFields: HomePageFields;
  };
  newArrivals: { nodes: ProductNode[] };
  bestSellers: { nodes: ProductNode[] };
}