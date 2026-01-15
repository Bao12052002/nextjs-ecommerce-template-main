// src/utils/routes.ts

export const ROUTES = {
  SHOP: "/shop",
  CATEGORY: "/category",
  PRODUCT: "/product",
};

export const getShopLink = () => ROUTES.SHOP;
export const getCategoryLink = (slug: string) => `${ROUTES.CATEGORY}/${slug}`;
export const getProductLink = (slug: string) => `${ROUTES.PRODUCT}/${slug}`;