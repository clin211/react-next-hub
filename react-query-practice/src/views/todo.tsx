import { useQuery } from '@tanstack/react-query';
import { Card, List, Spin, Alert, Empty, Typography } from 'antd';

const { Title } = Typography;

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

export default function TodoList() {
    const {
        data: todos,
        isPending,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    // 处理加载状态
    if (isPending) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <p>Loading todos...</p>
            </div>
        );
    }

    // 处理错误状态
    if (isError) {
        return (
            <Alert
                type="error"
                message="Error"
                description={error.message}
                showIcon
            />
        );
    }

    // 处理空数据状态
    if (!todos?.length) {
        return <Empty description="No todos found" />;
    }

    return (
        <Card>
            {isFetching && (
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Spin size="small" />
                </div>
            )}

            <Title level={4}>Todo List</Title>

            <List
                dataSource={todos}
                renderItem={(todo) => (
                    <List.Item>
                        <List.Item.Meta
                            title={todo.title}
                            description={`Status: ${todo.completed ? 'Completed' : 'Pending'}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}