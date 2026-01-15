export const ROUTES = {
  SHOP: "/san-pham",
  PRODUCT_PREFIX: "/p",
  CATEGORY_PREFIX: "/danh-muc-san-pham", // 👈 Sửa dòng này để khớp với URL bạn muốn
};

export const getShopLink = () => ROUTES.SHOP;

export const getProductLink = (slug: string) => `${ROUTES.PRODUCT_PREFIX}/${slug}`;

// Hàm tạo link danh mục
export const getCategoryLink = (slug: string) => `${ROUTES.CATEGORY_PREFIX}/${slug}`;