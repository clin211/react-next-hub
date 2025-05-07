import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productKeys } from '@/hooks/queries/useProducts';

interface RatingData {
    productId: number;
    rating: number;
}

// 模拟 API 调用
const rateProductApi = async (data: RatingData) => {
    // 在实际应用中，这里会是一个真实的 API 调用
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, productId: data.productId, rating: data.rating };
};

export function useRateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RatingData) => rateProductApi(data),

        onSuccess: (result, variables) => {
            // 获取当前产品数据
            const currentProduct = queryClient.getQueryData<Product>(
                productKeys.detail(variables.productId)
            );

            if (currentProduct) {
                // 直接更新缓存中的产品评分
                const updatedProduct = {
                    ...currentProduct,
                    rating: {
                        ...currentProduct.rating,
                        rate: (currentProduct.rating.rate * currentProduct.rating.count + variables.rating) /
                            (currentProduct.rating.count + 1),
                        count: currentProduct.rating.count + 1
                    }
                };

                // 设置更新后的产品详情
                queryClient.setQueryData(
                    productKeys.detail(variables.productId),
                    updatedProduct
                );

                // 更新产品列表中的对应产品
                queryClient.setQueriesData<Product[]>(
                    { queryKey: productKeys.lists(), exact: false },
                    (oldData) => {
                        if (!oldData) return undefined;

                        return oldData.map(product =>
                            product.id === variables.productId ? updatedProduct : product
                        );
                    }
                );
            }
        }
    });
}