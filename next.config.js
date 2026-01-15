/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Thay thế 'domains' bằng 'remotePatterns' để an toàn và linh hoạt hơn
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portal.khopanel.com',
        pathname: '/**',
      },
      // Thêm domain local nếu cần test ảnh
      // { protocol: 'http', hostname: 'localhost' }, 
    ],
  },
async rewrites() {
    return [
      // 1. Trang Cửa hàng
      {
        source: '/san-pham', 
        destination: '/shop', 
      },
      // 2. Trang Sản phẩm (domain.com/p/ten-sp)
      {
        source: '/p/:slug',
        destination: '/product/:slug',
      },
      // 3. 👇 QUAN TRỌNG: Ánh xạ Danh mục WooCommerce vào code xử lý
      // Link hiển thị: /danh-muc-san-pham/panel-cach-nhiet-pu
      // Code xử lý: src/app/[slug]/page.tsx (hoặc src/app/category/[slug]/page.tsx tùy bạn đặt)
      {
        source: '/danh-muc-san-pham/:slug', 
        destination: '/:slug', // Trỏ về Dynamic Route gốc [slug] nơi chứa logic check Category
        // LƯU Ý: Nếu bạn để code ở src/app/category/[slug] thì đổi thành destination: '/category/:slug'
      },
    ];
  },
};
module.exports = nextConfig;