import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import Providers from './providers';

// 这是一个服务器组件，用于预取数据并将状态传递给客户端组件
export default async function WithHydration({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = getQueryClient();

    // 在服务器端预取数据 - 使用 Fake Store API
    await queryClient.prefetchQuery({
        queryKey: ['global-config'],
        queryFn: () => fetch('https://fakestoreapi.com/products/categories').then(res => res.json()),
    });

    // 序列化缓存状态
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <Providers>{children}</Providers>
        </HydrationBoundary>
    );
}