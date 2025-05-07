'use client';

import { useState } from 'react';
import { useProducts, useProductCategories, useProductsByCategory } from '@/hooks/queries/useProducts';
import Link from 'next/link';

export default function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    // 获取产品分类
    const {
        data: categories,
        isLoading: isCategoriesLoading,
        error: categoriesError
    } = useProductCategories();

    // 根据是否选择分类决定使用哪个查询
    const {
        data: products,
        isLoading: isProductsLoading,
        error: productsError,
        isRefetching,
    } = selectedCategory
            ? useProductsByCategory(selectedCategory)
            : useProducts();

    // 加载状态处理
    if (isCategoriesLoading || isProductsLoading) {
        return <div className="p-4">正在加载产品数据...</div>;
    }

    // 错误状态处理
    if (categoriesError || productsError) {
        return (
            <div className="p-4 text-red-500">
                加载数据时出错：
                {categoriesError?.message || productsError?.message}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">产品列表</h1>

            {/* 分类筛选 */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">按分类筛选</h2>
                <div className="flex flex-wrap gap-2">
                    <button
                        className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedCategory('')}
                    >
                        全部
                    </button>
                    {categories?.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                    <div className='flex-row items-center cursor-pointer'>
                        <Link href='/product/create' className='bg-blue-500 text-white px-4 py-2 rounded'>create</Link>
                    </div>
                </div>
            </div>

            {/* 正在刷新的指示器 */}
            {isRefetching && (
                <div className="mb-4 text-blue-500">正在更新数据...</div>
            )}

            {/* 产品网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="object-contain h-40"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-2" title={product.title}>
                                {product.title}
                            </h3>
                            <p className="text-gray-700 mb-2 line-clamp-3" title={product.description}>
                                {product.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-blue-600">${product.price}</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1">{product.rating.rate}</span>
                                    <span className="ml-1 text-gray-500">({product.rating.count})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 无数据状态 */}
            {products?.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    没有找到相关产品
                </div>
            )}
        </div>
    );
}