'use client';

import { useState } from 'react';
import { useAddToCart } from '@/hooks/mutations/useCartMutations';
import { Product } from '@/hooks/queries/useProducts';

interface AddToCartProps {
    product: Product;
    userId: number;
}

export default function AddToCart({ product, userId }: AddToCartProps) {
    const [quantity, setQuantity] = useState(1);
    const addToCartMutation = useAddToCart(userId);

    const handleAddToCart = () => {
        addToCartMutation.mutate({
            productId: product.id,
            quantity,
        });
    };

    return (
        <div className="mt-4">
            <div className="flex items-center space-x-2 mb-2">
                <button
                    className="px-2 py-1 border rounded"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                    -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                    className="px-2 py-1 border rounded"
                    onClick={() => setQuantity(prev => prev + 1)}
                >
                    +
                </button>
            </div>

            <button
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
            >
                {addToCartMutation.isPending ? '添加中...' : '加入购物车'}
            </button>

            {/* 操作状态提示 */}
            {addToCartMutation.isSuccess && (
                <div className="mt-2 text-green-500 text-sm">
                    成功添加到购物车！
                </div>
            )}

            {addToCartMutation.isError && (
                <div className="mt-2 text-red-500 text-sm">
                    添加失败: {addToCartMutation.error.message}
                </div>
            )}
        </div>
    );
}