// src/types/product.ts
export type Product = {
  // --- Dữ liệu Static cũ ---
  title?: string;
  reviews?: number;
  price?: number | string;
  discountedPrice?: number;
  id: number | string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };

  // --- Dữ liệu WordPress mới ---
  name?: string;
  slug?: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  regularPrice?: string;
  salePrice?: string;
  averageRating?: number;
  reviewCount?: number;
};