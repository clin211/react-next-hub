'use client';

import { useState } from 'react';
import { useRateProduct } from '@/hooks/mutations/useRateProduct';

interface RateProductProps {
    productId: number;
    currentRating: number;
}

export default function RateProduct({ productId, currentRating }: RateProductProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const rateProductMutation = useRateProduct();

    const handleRating = () => {
        if (rating === 0) return;

        rateProductMutation.mutate({
            productId,
            rating
        });
    };

    return (
        <div className="mt-4">
            <p className="text-sm font-medium mb-1">为这个产品评分:</p>

            <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="text-2xl focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <span className={
                            (hover || rating) >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }>
                            ★
                        </span>
                    </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                    {rating > 0 ? `${rating} 星` : "请选择评分"}
                </span>
            </div>

            <button
                className="px-4 py-1 bg-blue-500 text-white rounded text-sm disabled:bg-blue-300"
                onClick={handleRating}
                disabled={rating === 0 || rateProductMutation.isPending}
            >
                {rateProductMutation.isPending ? '提交中...' : '提交评分'}
            </button>

            {rateProductMutation.isSuccess && (
                <div className="mt-2 text-green-500 text-sm">
                    感谢您的评分！
                </div>
            )}
        </div>
    );
}