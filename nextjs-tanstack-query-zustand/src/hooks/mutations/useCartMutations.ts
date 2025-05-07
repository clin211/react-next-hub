import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/fetch';

// 购物车项类型
export interface CartItem {
    productId: number;
    quantity: number;
}

// 购物车类型
export interface Cart {
    id?: number;
    userId: number;
    date: string;
    products: CartItem[];
}

// 查询键
export const cartKeys = {
    all: ['carts'] as const,
    user: (userId: number) => [...cartKeys.all, 'user', userId] as const,
    detail: (cartId: number) => [...cartKeys.all, 'detail', cartId] as const,
};

// 添加商品到购物车
export function useAddToCart(userId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: CartItem) => {
            const cartData: Cart = {
                userId,
                date: new Date().toISOString(),
                products: [item],
            };
            return api.cart.addToCart(cartData);
        },

        // 乐观更新
        onMutate: async (newItem) => {
            // 取消正在进行的重新获取
            await queryClient.cancelQueries({ queryKey: cartKeys.user(userId) });

            // 获取当前数据的快照
            const previousCarts = queryClient.getQueryData<Cart[]>(cartKeys.user(userId));

            // 乐观地更新缓存
            if (previousCarts) {
                queryClient.setQueryData<Cart[]>(cartKeys.user(userId), (old = []) => {
                    // 检查是否存在购物车
                    if (old.length === 0) {
                        // 如果不存在，创建一个新的购物车
                        return [{
                            id: Date.now(), // 临时 ID
                            userId,
                            date: new Date().toISOString(),
                            products: [newItem],
                        }];
                    }

                    // 如果存在，更新最新的购物车
                    const latestCart = { ...old[0] };

                    // 检查商品是否已经在购物车中
                    const existingProductIndex = latestCart.products.findIndex(
                        p => p.productId === newItem.productId
                    );

                    if (existingProductIndex >= 0) {
                        // 如果已存在，更新数量
                        latestCart.products[existingProductIndex].quantity += newItem.quantity;
                    } else {
                        // 如果不存在，添加新商品
                        latestCart.products.push(newItem);
                    }

                    return [latestCart, ...old.slice(1)];
                });
            }

            // 返回上下文对象，用于错误回滚
            return { previousCarts };
        },

        // 错误回滚
        onError: (_, __, context) => {
            if (context?.previousCarts) {
                queryClient.setQueryData(cartKeys.user(userId), context.previousCarts);
            }
        },

        // 操作完成后
        onSettled: () => {
            // 无论成功还是失败，都重新获取购物车数据
            queryClient.invalidateQueries({ queryKey: cartKeys.user(userId) });
        },
    });
}