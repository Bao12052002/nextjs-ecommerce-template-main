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
};

module.exports = nextConfig;