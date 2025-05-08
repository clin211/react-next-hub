import { useState } from 'react';
import { Table, Card, Spin, Alert, Space, Tag } from 'antd';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { TablePaginationConfig } from 'antd/es/table';

interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    images: string[]
    thumbnail: string
}

export interface Dimensions {
    width: number
    height: number
    depth: number
}

export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}


interface PaginationParams {
    page: number;
    limit: number;
}

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

async function fetchProducts({ page, limit }: PaginationParams): Promise<ProductsResponse> {
    const skip = (page - 1) * limit;
    const response = await fetch(
        `/api/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export default function ProductList() {
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 10,
    });

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['products', pagination.page],
        queryFn: () => fetchProducts(pagination),
        placeholderData: keepPreviousData,
    });

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        setPagination({
            page: newPagination.current || 1,
            limit: newPagination.pageSize || 10,
        });
    };

    if (isPending) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

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

    return (
        <Card title="Product List">
            <Table
                columns={[
                    {
                        title: 'Thumbnail',
                        dataIndex: 'thumbnail',
                        key: 'thumbnail',
                        render: (thumbnail) => (
                            <img src={thumbnail} alt="product" style={{ width: 50, height: 50, objectFit: 'contain' }} />
                        ),
                    },
                    {
                        title: 'Title',
                        dataIndex: 'title',
                        key: 'title',
                        render: (title) => (
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {title}
                            </div>
                        ),
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                        render: (price, record) => (
                            <Space direction="vertical" size={0}>
                                <span style={{ color: '#ff4d4f', textDecoration: 'line-through' }}>
                                    ${(price * (1 + record.discountPercentage / 100)).toFixed(2)}
                                </span>
                                <span style={{ fontWeight: 'bold' }}>${price}</span>
                            </Space>
                        ),
                    },
                    {
                        title: 'Category',
                        dataIndex: 'category',
                        key: 'category',
                        render: (category) => (
                            <Tag color="blue">{category}</Tag>
                        ),
                    },
                ]}
                dataSource={data?.products}
                rowKey="id"
                pagination={{
                    current: pagination.page,
                    pageSize: pagination.limit,
                    total: data?.total,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} items`,
                }}
                onChange={handleTableChange}
                loading={isPending}
            />
        </Card>
    );
}