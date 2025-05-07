'use client';

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
    // 在客户端组件中创建 QueryClient 实例
    const [client] = useState(() => queryClient);

    return (
        <QueryClientProvider client={client}>
            {/* 这里可以嵌套其他 Provider */}
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}