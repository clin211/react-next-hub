import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/fetch';

// 产品类型定义
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number) => [...productKeys.details(), id] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
    category: (name: string) => [...productKeys.all, 'category', name] as const,
};

// 获取所有产品
export function useProducts(filters?: Record<string, any>) {
    return useQuery<Product[]>({
        queryKey: productKeys.list(filters || {}),
        queryFn: () => api.products.getAll(),
    });
}

// 获取单个产品详情
export function useProduct(id: number) {
    return useQuery<Product>({
        queryKey: productKeys.detail(id),
        queryFn: () => api.products.getById(id),
        enabled: !!id, // 只有在 id 存在时才执行查询
    });
}

// 获取产品分类
export function useProductCategories() {
    return useQuery<string[]>({
        queryKey: productKeys.categories(),
        queryFn: () => api.products.getCategories(),
        staleTime: 1000 * 60 * 60, // 分类数据一小时内保持新鲜
    });
}

// 获取特定分类的产品
export function useProductsByCategory(category: string) {
    return useQuery<Product[]>({
        queryKey: productKeys.category(category),
        queryFn: () => api.products.getByCategory(category),
        enabled: !!category, // 只有在分类名存在时才执行查询
    });
}