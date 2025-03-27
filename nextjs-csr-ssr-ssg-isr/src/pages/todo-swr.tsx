import useSWR from 'swr';
import type { SWRResponse } from 'swr';

// 定义fetcher函数，它接受fetch的参数并返回一个Promise，该Promise解析为JSON
const fetcher = (...args: Parameters<typeof fetch>): Promise<Todo> => fetch(...args).then((res) => res.json());

// 定义接口来描述API响应的数据结构
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed?: boolean;
}

export default function Page() {
    const { data, error, isLoading }: SWRResponse<Todo | null, Error> = useSWR<Todo | null>(
        'https://jsonplaceholder.typicode.com/todos/1',
        fetcher
    );

    if (error) return <p>Failed to load.</p>;
    if (isLoading) return <p>Loading...</p>;

    // 由于 data 可能是null，我们需要检查它是否存在
    return data ? <p>Your Data: {data.title}</p> : <p>No data available.</p>;
}