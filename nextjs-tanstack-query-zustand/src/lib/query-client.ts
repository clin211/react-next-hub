import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 数据保鲜时间：在这段时间内，数据被认为是"新鲜"的，不会重新获取
            staleTime: 1000 * 60 * 5, // 5分钟

            // 缓存时间：数据在缓存中保留的时间，超过后将被垃圾回收
            gcTime: 1000 * 60 * 10, // 10分钟

            // 重试次数：请求失败时自动重试的次数
            retry: 3,

            // 重试延迟：每次重试之间的延迟时间（毫秒）
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

            // 网络恢复时自动重新获取数据
            refetchOnReconnect: true,

            // 窗口重新获得焦点时重新获取数据
            refetchOnWindowFocus: 'always',

            // 组件挂载时是否重新获取数据（即使数据是新鲜的）
            refetchOnMount: false,
        },
        mutations: {
            // 失败时重试次数
            retry: 2,

            // 当页面离开后是否继续进行变更操作
            throwOnError: true,
        },
    },
});

// 为特定类型的查询定义默认行为
export const configureQueryClient = () => {
    // 为所有用户相关查询设置特殊缓存策略
    queryClient.setQueryDefaults(['users'], {
        staleTime: 1000 * 60 * 30, // 30分钟
        gcTime: 1000 * 60 * 60, // 1小时
    });

    // 为实时性要求高的数据配置更短的保鲜时间
    queryClient.setQueryDefaults(['notifications'], {
        staleTime: 1000 * 30, // 30秒
        refetchInterval: 1000 * 60, // 每分钟自动刷新
    });

    return queryClient;
};

// 使用 React 的 cache 函数确保在 RSC 中创建单例
export const getQueryClient = cache(() => new QueryClient({
    defaultOptions: {
        queries: {
            // SSR友好的配置
            staleTime: 5 * 1000, // 5秒
            gcTime: 10 * 60 * 1000, // 10分钟

            // 在服务器端渲染时，我们通常不希望重试，因为它会延迟页面渲染
            retry: process.env.NODE_ENV === 'production' ? 3 : 0,

            // 对于 SSR 和 SSG，通常需要禁用这些自动刷新选项
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
}));
