import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        // disableStaticImages: true,
        formats: ['image/avif', 'image/webp'],
        localPatterns: [
            {
                pathname: '/assets/images/**',
                search: '',
            },
        ],
        remotePatterns: [
            {
                protocol: 'https', // 协议
                hostname: 'images.unsplash.com', // 域名
                port: '', // 端口
                pathname: '/**', // 路径
                search: '', // 配置参数
            },
            {
                protocol: 'https', // 协议
                hostname: 'images.pexels.com', // 域名
                port: '', // 端口
                pathname: '/photos/**', // 路径
                search: '', // 配置参数
            }
        ],
        // loader: 'custom',
        // loaderFile: './my/image/loader.js',
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;
