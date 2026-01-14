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
export interface PostNode {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}
export interface TestimonialItem {
  authorName: string;
  reviewText: string;
  rating: number;
  authorImage: { node: WPImage };
}
export interface HeroSmallBanner {
  title: string;
  subtitle: string;
  salePrice: string;
  regularPrice: string;
  link: string;
  image: {
    node: WPImage;
  };
}
export interface HomePageFields {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonUrl: string;
  heroImage: { node: WPImage };
  heroSlider: HeroSlide[];
  heroRight1: HeroSmallBanner;
  heroRight2: HeroSmallBanner;

  // Features List
  featuresList: FeatureItem[];
  
  // --- BIG BANNER ---
  promoTitle: string;
  promoSubtitle: string;
  promoButtonText: string;
  promoLink: string;
  promoDescription: string; // Mới thêm
  promoImage: WPImageNode;

  // --- SMALL BANNER 1 (Left) ---
  promoS1Image: WPImageNode;
  promoS1Title: string;
  promoS1Subtitle: string;
  promoS1Discount: string;
  promoS1BtnText: string;
  promoS1Link: string;

  // --- SMALL BANNER 2 (Right) ---
  promoS2Image: WPImageNode;
  promoS2Title: string;
  promoS2Subtitle: string;
  promoS2Description: string;
  promoS2BtnText: string;
  promoS2Link: string;
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
export interface FeatureItem {
  title: string;
  description: string;
  iconImage: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}
export interface HomePageData {
  page: {
    homePageFields: HomePageFields;
  };
  newArrivals: { nodes: ProductNode[] };
  bestSellers: { nodes: ProductNode[] };
  latestPosts: { nodes: PostNode[] };
}

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  count?: number;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
}

export interface HomePageData {
  page: {
    homePageFields: HomePageFields;
  };
  // 👇 THÊM DÒNG NÀY
  productCategories: {
    nodes: CategoryNode[];
  };
  newArrivals: { nodes: ProductNode[] };
  bestSellers: { nodes: ProductNode[] };
}

export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface HeroSlide {
  discountPercent: string;
  discountLabel: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: {
    node: WPImage;
  };
}