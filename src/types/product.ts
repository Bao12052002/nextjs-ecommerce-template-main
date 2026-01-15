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
export interface ProductNode {
  id: string;
  databaseId?: number;
  slug: string;
  name: string;
  image?: {
    sourceUrl: string;
  };
  price?: string; // Giá gốc (VD: "$100")
  regularPrice?: string;
  salePrice?: string;
  onSale?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export interface ProductCategoryNode {
  id: string;
  name: string;
  slug: string;
  count?: number; // Số lượng sản phẩm
} 