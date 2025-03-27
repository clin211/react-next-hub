import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 访问 /old_page 永久重定向为 /new_page
      {
        source: '/old_page',
        destination: '/new_page',
        permanent: true,
      },
      // 使用通配符匹配路径，访问 /old_blog/123 永久重定向为 /new_blog/123
      {
        source: '/old_blog/:post_id',
        destination: '/new_blog/:post_id',
        permanent: true,
      },
      // 使用正则表达式进行临时重定向匹配，访问 /old_blog/123 临时重定向为 /new_blog/123
      {
        source: '/old_blog/:post_id(\\d{1,})', // 正则表达式匹配 /old_blog/123，但不匹配 /old_blog/xyz:
        destination: '/new_blog/:post_id',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
