import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Tag, Alert, Spin } from 'antd';
import { useEffect, useRef } from 'react';

interface Product {
    id: number;
    name: string;
    stock: number;
}

interface StockUpdate {
    type: 'STOCK_UPDATE';
    data: {
        productId: number;
        stock: number;
    };
}

interface InitialData {
    type: 'INITIAL_DATA';
    data: Product[];
}

type WebSocketMessage = StockUpdate | InitialData;

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    // 确保返回的是数组
    return Array.isArray(data) ? data : data.products || [];
}

export default function RealTimeProductList() {
    const queryClient = useQueryClient();
    const wsRef = useRef<WebSocket | null>(null);

    // 获取初始数据
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    useEffect(() => {
        // 创建 WebSocket 连接
        wsRef.current = new WebSocket('ws://localhost:8080');

        wsRef.current.onmessage = (event) => {
            const message: WebSocketMessage = JSON.parse(event.data);

            if (message.type === 'INITIAL_DATA') {
                // 确保数据是数组
                const initialData = Array.isArray(message.data) ? message.data : [];
                queryClient.setQueryData(['products'], initialData);
            } else if (message.type === 'STOCK_UPDATE') {
                // 更新单个产品的库存
                queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
                    if (!oldData) return oldData;
                    return oldData.map((product) =>
                        product.id === message.data.productId
                            ? { ...product, stock: message.data.stock }
                            : product
                    );
                });
            }
        };

        // 清理函数
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [queryClient]);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                type="error"
                message="Error"
                description={error.message}
                showIcon
            />
        );
    }

    // 确保 products 是数组
    const productList = Array.isArray(products) ? products : [];

    return (
        <Card title="Real-time Product List">
            <Table
                dataSource={productList}
                rowKey="productId"
                columns={[
                    {
                        title: 'Product Name',
                        dataIndex: 'name',
                        key: 'name',
                        render: (name: string) => <a>{name}</a>,
                    },
                    {
                        title: 'Stock',
                        dataIndex: 'stock',
                        key: 'stock',
                        render: (stock: number) => (
                            <Tag color={stock > 50 ? 'green' : stock > 20 ? 'orange' : 'red'}>
                                {stock} units
                            </Tag>
                        ),
                    },
                ]}
            />
        </Card>
    );
}