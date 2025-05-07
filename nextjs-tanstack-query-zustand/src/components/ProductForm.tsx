'use client';

import { useState } from 'react';
import { useAddProduct } from '@/hooks/mutations/useProductMutations';

export default function ProductForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    // 使用变更钩子
    const addProductMutation = useAddProduct();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 创建新产品对象
        const newProduct = {
            title,
            price: parseFloat(price),
            description,
            category,
            image,
            rating: { rate: 0, count: 0 }
        };

        // 调用变更函数
        addProductMutation.mutate(newProduct, {
            onSuccess: () => {
                // 重置表单
                setTitle('');
                setPrice('');
                setDescription('');
                setCategory('');
                setImage('');
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">添加新产品</h2>

            {/* 显示变更状态 */}
            {addProductMutation.isPending && (
                <div className="mb-4 text-blue-500">
                    正在添加产品...
                </div>
            )}

            {addProductMutation.isError && (
                <div className="mb-4 text-red-500">
                    添加失败: {addProductMutation.error.message}
                </div>
            )}

            {addProductMutation.isSuccess && (
                <div className="mb-4 text-green-500">
                    产品添加成功!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">产品名称</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">价格</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        min="0"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">描述</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">分类</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">图片 URL</label>
                    <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={addProductMutation.isPending}
                    >
                        {addProductMutation.isPending ? '提交中...' : '添加产品'}
                    </button>
                </div>
            </form>
        </div>
    );
}