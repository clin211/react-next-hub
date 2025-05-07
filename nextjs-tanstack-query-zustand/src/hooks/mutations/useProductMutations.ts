import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productKeys } from '@/hooks/queries/useProducts';
import { api } from '@/utils/fetch';

// 添加新产品
export function useAddProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        // 变更函数
        mutationFn: (newProduct: Omit<Product, 'id'>) => {
            return api.products.create(newProduct);
        },
        // 变更成功后的回调
        onSuccess: (data) => {
            // 让包含产品列表的查询失效，触发重新获取
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            // 可以显示成功通知或执行其他操作
            console.log('产品添加成功:', data);
        },
        // 变更失败后的回调
        onError: (error) => {
            // 可以显示错误通知
            console.error('添加产品时出错:', error);
        }
    });
}

// 更新产品
export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, product }: { id: number, product: Partial<Product> }) => {
            return api.products.update(id, product);
        },
        onSuccess: (data, variables) => {
            // 更新产品详情缓存
            queryClient.invalidateQueries({
                queryKey: productKeys.detail(variables.id)
            });
            // 更新可能包含此产品的列表
            queryClient.invalidateQueries({
                queryKey: productKeys.lists()
            });
        }
    });
}

// 删除产品
export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => {
            return api.products.delete(id);
        },

        // 乐观更新
        onMutate: async (id) => {
            // 取消正在进行的查询
            await queryClient.cancelQueries({ queryKey: productKeys.detail(id) });
            await queryClient.cancelQueries({ queryKey: productKeys.lists() });

            // 保存当前产品详情
            const previousProduct = queryClient.getQueryData<Product>(
                productKeys.detail(id)
            );

            // 保存当前产品列表
            const previousProducts = queryClient.getQueryData<Product[]>(
                productKeys.list({})
            );

            // 从产品详情缓存中移除产品
            queryClient.setQueryData(productKeys.detail(id), null);

            // 从产品列表缓存中移除产品
            if (previousProducts) {
                queryClient.setQueryData<Product[]>(
                    productKeys.list({}),
                    previousProducts.filter(product => product.id !== id)
                );
            }

            // 返回上下文对象，包含之前的状态
            return { previousProduct, previousProducts };
        },

        // 错误回滚
        onError: (_, id, context) => {
            // 恢复产品详情
            if (context?.previousProduct) {
                queryClient.setQueryData(
                    productKeys.detail(id),
                    context.previousProduct
                );
            }

            // 恢复产品列表
            if (context?.previousProducts) {
                queryClient.setQueryData(
                    productKeys.list({}),
                    context.previousProducts
                );
            }
        },

        // 操作完成后
        onSettled: (_, __, id) => {
            // 无论成功还是失败，都重新验证查询
            queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        }
    });
}