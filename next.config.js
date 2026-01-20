/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portal.khopanel.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      // 1. Trang Cửa hàng (Shop)
      {
        source: '/san-pham', 
        destination: '/shop', 
      },
      
      // 2. Trang Chi tiết sản phẩm (Product)
      // Browser hiển thị: /p/ten-san-pham
      // Code chạy: src/app/(site)/product/[slug]/page.tsx
      {
        source: '/p/:slug',
        destination: '/product/:slug',
      },

      // 3. 👇 SỬA LẠI CHUẨN Ở ĐÂY 👇
      // Trang Danh mục sản phẩm (Category)
      // Browser hiển thị: /danh-muc-san-pham/ten-danh-muc
      // Code chạy: src/app/(site)/category/[slug]/page.tsx
      {
        source: '/danh-muc-san-pham/:slug', 
        destination: '/category/:slug', 
      },
      
      // 4. (Tùy chọn) Trang bài viết Blog hoặc Trang tĩnh
      // Browser hiển thị: /bai-viet/ten-bai
      // Code chạy: src/app/(site)/blogs/[slug]/page.tsx
      {
        source: '/bai-viet/:slug',
        destination: '/blogs/:slug',
      }
    ];
  },
};
module.exports = nextConfig;