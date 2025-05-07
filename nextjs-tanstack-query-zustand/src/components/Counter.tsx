'use client';

import useCounterStore from '@/stores/useCounterStore';

export default function Counter() {
    // 直接从存储中获取状态和方法
    const { count, increment, decrement, reset } = useCounterStore();

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">计数器</h2>
            <p className="text-3xl text-center mb-4">{count}</p>
            <div className="flex gap-2 justify-center">
                <button
                    onClick={decrement}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    减少
                </button>
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    重置
                </button>
                <button
                    onClick={increment}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    增加
                </button>
            </div>
        </div>
    );
}